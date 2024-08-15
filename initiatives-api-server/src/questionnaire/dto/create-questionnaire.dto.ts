import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class CreateQuestionnaireDto {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsNumber()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    createdBy: number;
  }
  