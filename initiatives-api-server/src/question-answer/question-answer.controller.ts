import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { QuestionAnswerService } from './question-answer.service';
import { CreateQuestionAnswerDto } from './dto/create-question-answer.dto';
import { UpdateQuestionAnswerDto } from './dto/update-question-answer.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('question-answers')
export class QuestionAnswerController {
  constructor(
    private readonly questionAnswerService: QuestionAnswerService,
  ) {}

  @Post()
  create(
    @GetUser('id') userId: number,
    @Body()
    createQuestionAnswerDto: CreateQuestionAnswerDto,
  ) {
    return this.questionAnswerService.create(
      userId,
      createQuestionAnswerDto,
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateQuestionAnswerDto: UpdateQuestionAnswerDto,
  ) {
    return this.questionAnswerService.update(
      id,
      updateQuestionAnswerDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionAnswerService.remove(id);
  }
}
