import { CreateQuestionDto } from './dto/create-question.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionAnswer {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createQuestionAnswerDto: CreateQuestionDto,
  ) {
    return this.prisma.question.create({
      data: {
        createdBy: userId,
        ...createQuestionAnswerDto,
      },
    });
  }
  
  remove(id: number) {
    return `This action removes a #${id} questionAnswer`;
  }
}
