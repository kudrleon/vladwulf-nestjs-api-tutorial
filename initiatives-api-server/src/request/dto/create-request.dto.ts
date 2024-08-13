import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

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
  summary: string
}
