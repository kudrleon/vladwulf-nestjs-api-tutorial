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
    return this.prisma.questionAnswer.create({
      data: {
        userId,
        ...createQuestionAnswerDto,
      },
    });
  }

  update(
    id: number,
    updateQuestionAnswerDto: UpdateQuestionAnswerDto,
  ) {
    return this.prisma.questionAnswer.update({
      where: {
        id,
      },
      data: {
        ...updateQuestionAnswerDto,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} questionAnswer`;
  }
}
