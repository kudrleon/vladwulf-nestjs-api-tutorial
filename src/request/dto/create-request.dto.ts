import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateRequestDto {
  @IsNumber()
  @IsNotEmpty()
  questionnaireId: number;
}
