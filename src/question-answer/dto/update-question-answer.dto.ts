import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateQuestionAnswerDto {
  @IsString()
  @IsNotEmpty()
  answer: string;
}
