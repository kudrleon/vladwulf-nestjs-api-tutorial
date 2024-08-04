import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { EditUserDto } from '../src/user/dto';
import { CreateRequestDto } from 'src/request/dto';
import { CreateQuestionAnswerDto } from 'src/question-answer/dto/create-question-answer.dto';

describe('App e2e Request Function', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        exceptionFactory: (errors) => {
          const messages = errors.map(
            (error) =>
              `${
                error.property
              } has wrong value ${
                error.value
              }, ${Object.values(
                error.constraints,
              ).join(', ')}`,
          );
          return new BadRequestException(
            messages,
          );
        },
      }),
    );
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl(
      'http://localhost:3333',
    );
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'vlad@gmail.com',
      password: '123',
    };
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores(
            'userAccessToken',
            'access_token',
          );
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization:
              'Bearer $S{userAccessToken}',
          })
          .expectStatus(200)
          .stores('userId', 'id');
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Vladimir',
          email: 'vlad@codewithvlad.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization:
              'Bearer $S{userAccessToken}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Requests', () => {
    describe('Get empty requests', () => {
      it('should get requests', () => {
        return pactum
          .spec()
          .get('/requests')
          .withHeaders({
            Authorization:
              'Bearer $S{userAccessToken}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create request', () => {
      const dto: CreateRequestDto = {
        questionnaireId: 1,
      };
      it('should create request', () => {
        return pactum
          .spec()
          .post('/requests')
          .withHeaders({
            Authorization:
              'Bearer $S{userAccessToken}',
          })
          .withBody(dto)
          .expectStatus(201)
          .stores('requestId', 'id');
      });
    });

    describe('Get My requests', () => {
      it('should get my request', () => {
        return pactum
          .spec()
          .get('/requests/my')
          .withHeaders({
            Authorization:
              'Bearer $S{userAccessToken}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get requests', () => {
      it('should get request', () => {
        return pactum
          .spec()
          .get('/requests')
          .withHeaders({
            Authorization:
              'Bearer $S{userAccessToken}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get request by id', () => {
      it('should get request by id', () => {
        return pactum
          .spec()
          .get('/requests/{id}')
          .withPathParams('id', '$S{requestId}')
          .withHeaders({
            Authorization:
              'Bearer $S{userAccessToken}',
          })
          .expectStatus(200)
          .expectBodyContains('$S{requestId}');
        //.expectJsonMatch({id: '$S{bookmarkId}'}) would have been the correct way of testing to prevent false positive matches with other numbers, user id etc.
      });
    });

    describe('Create answer', () => {
      const dto: CreateQuestionAnswerDto = {
        questionId: 1,
        requestId: 1,
        answer: 'Test Answer',
      };
      it('should create answer', () => {
        return pactum
          .spec()
          .post('/question-answers')
          .withHeaders({
            Authorization:
              'Bearer $S{userAccessToken}',
          })
          .withBody(dto)
          .expectStatus(201)
          .expectBodyContains(dto.answer)
          .stores('answerId', 'id');
      });
    });

    // describe('Delete bookmark by id', () => {
    //   it('should delete bookmark', () => {
    //     return pactum
    //       .spec()
    //       .delete('/bookmarks/{id}')
    //       .withPathParams('id', '$S{bookmarkId}')
    //       .withHeaders({
    //         Authorization:
    //           'Bearer $S{userAccessToken}',
    //       })
    //       .expectStatus(204);
    //   });

    //   it('should get empty bookmarks', () => {
    //     return pactum
    //       .spec()
    //       .get('/bookmarks')
    //       .withHeaders({
    //         Authorization:
    //           'Bearer $S{userAccessToken}',
    //       })
    //       .expectStatus(200)
    //       .expectJsonLength(0);
    //   });
    // });
  });
});
