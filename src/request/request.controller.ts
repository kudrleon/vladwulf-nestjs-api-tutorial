import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Request } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { RequestService } from './request.service';
import {
  CreateRequestDto,
  EditRequestDto,
} from './dto';

//@UseGuards(JwtGuard)
@Controller('requests')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
  ) {}

  @Post()
  create(
    @Body() createRequestDto: CreateRequestDto,
  ) {
    return this.requestService.create(
      createRequestDto,
    );
  }

  @Get()
  getRequests() {
    return this.requestService.getRequests();
  }

  @Get(':id')
  getRequestById(
    @Param('id', ParseIntPipe) requestId: number,
  ) {
    return this.requestService.getRequestById(
      requestId,
    );
  }

  @Get('my')
  getMyRequest(@GetUser('id') userId: number) {
    return this.requestService.getRequestsByUserId(
      userId,
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) requestId: number,
    @Body() updateRequestDto: EditRequestDto,
  ) {
    return this.requestService.update(
      requestId,
      updateRequestDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) requestId: number,
  ) {
    return this.requestService.remove(requestId);
  }
}
