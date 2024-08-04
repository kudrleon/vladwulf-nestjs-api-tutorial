import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateRequestDto,
  EditRequestDto,
} from './dto';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createRequestDto: CreateRequestDto,
  ) {
    const request =
      await this.prisma.request.create({
        data: {
          userId,
          ...createRequestDto,
        },
      });

    return request;
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
