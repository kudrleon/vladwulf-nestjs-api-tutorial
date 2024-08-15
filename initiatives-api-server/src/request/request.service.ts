import {
  CreateRequestDto,
  EditRequestDto,
} from './dto';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { defaultQuestionnaireId } from 'src/utils/consts';

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

  getRequestById(id: number) {
    return this.prisma.request.findFirst({
      where: {
        id,
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
