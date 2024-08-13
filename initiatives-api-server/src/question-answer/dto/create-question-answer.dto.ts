import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateQuestionAnswerDto {
  @IsString()
  @IsNotEmpty()
  requestId: string;

  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
