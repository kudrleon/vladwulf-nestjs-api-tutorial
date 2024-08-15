import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { QuestionAnswerModule } from './question-answer/question-answer.module';
import { QuestionnaireModule } from './questionnaire/qustionnaire.module';
import { RequestModule } from './request/request.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    RequestModule,
    QuestionAnswerModule,
    QuestionnaireModule,
  ],
})
export class AppModule {}
