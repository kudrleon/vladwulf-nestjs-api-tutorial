import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateQuestionAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  requestId: number;

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
