import {
  CreateRequestDto,
  EditRequestDto,
} from './dto';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
      },
    });
  }

  getRequests() {
    return this.prisma.request.findMany();
  }

  getRequestById(id: string) {
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
                    questionAnswers: true,
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
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
