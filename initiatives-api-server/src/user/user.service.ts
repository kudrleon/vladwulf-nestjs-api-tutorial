import { EditUserDto } from './dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }

  retrieveUserById(id: string) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return null;
    }
    return this.prisma.user.findUnique({
      where: {
        id: parsedId,
      },
    });
  }
}
