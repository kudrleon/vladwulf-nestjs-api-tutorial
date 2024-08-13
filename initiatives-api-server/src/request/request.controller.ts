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
  Req,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { RequestService } from './request.service';
import {
  CreateRequestDto,
  EditRequestDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('requests')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
  ) {}

  @Post()
  create(
    @GetUser('id') userId: number,
    @Body() createRequestDto: CreateRequestDto,
  ) {
    return this.requestService.create(
      userId,
      createRequestDto,
    );
  }

  @Get('my')
  async getMyRequests(
    @GetUser('id') userId: number,
  ) {
    return this.requestService.getRequestsByUserId(
      userId,
    );
  }

  @Get()
  getRequests() {
    return this.requestService.getRequests();
  }

  @Get(':id')
  getRequestById(
    @Param('id', ParseIntPipe) requestId: string,
  ) {
    return this.requestService.getRequestById(
      requestId,
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
