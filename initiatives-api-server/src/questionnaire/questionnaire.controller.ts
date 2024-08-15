  import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    ParseIntPipe,
    Get,
  } from '@nestjs/common';
  import { QuestionnaireService } from './questionnaire.service';
  import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
  import { JwtGuard } from '../auth/guard';
  import { GetUser } from '../auth/decorator';
import { defaultQuestionnaireId } from 'src/utils/consts';
  
  @UseGuards(JwtGuard)
  @Controller('questionnaire')
  export class QuestionnaireController {
    constructor(
      private readonly questionnaire: QuestionnaireService,
    ) {}
  
    @Post()
    create(
      @GetUser('id') userId: number,
      @Body()
      createQuestionAnswerDto: CreateQuestionnaireDto,
    ) {
      return this.questionnaire.create(
        userId,
        createQuestionAnswerDto
      );
    }
  
    @Get()
    getQuestionnaireById(@Param('id', ParseIntPipe) id: number) {
      return this.questionnaire.getQuestionnaireWithAnswers(id);
    }
  
    @Get(':id')
    getQuestionnaireWithAnswers(@Param('id', ParseIntPipe) requestId: number | null) {
      return this.questionnaire.getQuestionnaireWithAnswers(requestId);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.questionnaire.remove(id);
    }
  }
  