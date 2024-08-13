import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
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
  summary: string
}
