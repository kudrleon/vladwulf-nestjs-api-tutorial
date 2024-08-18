import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { defaultQuestionnaireId } from '../../utils/consts';

export class CreateRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  questionnaireId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  businessOwner: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  summary: string;

  constructor(
    partial: Partial<CreateRequestDto>,
  ) {
    Object.assign(this, partial);
    this.questionnaireId = defaultQuestionnaireId;
    this.businessOwner =
      partial?.businessOwner || '';
    this.title = partial?.title || '';
    this.summary = partial?.summary || '';
  }
}
