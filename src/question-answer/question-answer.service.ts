import { Injectable } from '@nestjs/common';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { UpdateQuestionAnswerDto } from './dto/update-question-answer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionAnswerService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createQuestionAnswerDto: CreateQuestionAnswerDto,
  ) {
    const questionAnswer =
      await this.prisma.questionAnswer.create({
        data: {
          userId,
          ...createQuestionAnswerDto,
        },
      });

    return questionAnswer;
  }

  async update(
    id: number,
    updateQuestionAnswerDto: UpdateQuestionAnswerDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateQuestionAnswerDto,
      },
    });

    delete user.hash;

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} questionAnswer`;
  }
}
