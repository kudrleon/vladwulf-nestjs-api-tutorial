import {
  CreateRequestDto,
  EditRequestDto,
} from './dto';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { defaultQuestionnaireId } from '../utils/consts';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  create(
    userId: number,
    createRequestDto: CreateRequestDto,
  ) {
    return this.prisma.request.create({
      data: {
        userId,
        ...createRequestDto,
        questionnaireId: defaultQuestionnaireId,
      },
    });
  }

  getRequests() {
    return this.prisma.request.findMany();
  }

  async getRequestTemplate() {
    const questionnaire =
      await this.prisma.questionnaire.findFirst({
        where: {
          id: defaultQuestionnaireId,
        },
        include: {
          sections: {
            include: {
              questions: {
                include: {
                  questionAnswers: {
                    where: {
                      requestId: -1,
                    },
                  },
                },
              },
            },
          },
        },
      });
    const emptyRequest = new CreateRequestDto({});
    return {
      ...emptyRequest,
      questionnaire,
    };
  }
  getRequestById(id: number) {
    return this.prisma.request.findFirst({
      where: {
        id,
      },
      include: {
        questionnaire: {
          include: {
            sections: {
              include: {
                questions: {
                  include: {
                    questionAnswers: {
                      where: {
                        requestId: id,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  getRequestsByUserId(userId: number) {
    return this.prisma.request.findMany({
      where: {
        userId,
      },
    });
  }

  update(
    id: number,
    updateRequestDto: EditRequestDto,
  ) {
    return {
      message: `This action updates a #${id} request`,
      status: 204,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
