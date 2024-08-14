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
import { QuestionAnswerService } from 'src/question-answer/question-answer.service';

@UseGuards(JwtGuard)
@Controller('requests')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    // private readonly questionAnswerService: QuestionAnswerService,
  ) {}

  @Post()
  async create(
    @GetUser('id') userId: number,
    @Body() createRequestDto: CreateRequestDto,
  ) {
    // For now we will have first created questionnaire as default
    // const questionnaire = await this.questionAnswerService.getOldestQuestionAnswer()
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
    @Param('id', ParseIntPipe) requestId: number,
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
