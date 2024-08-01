import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestDto } from './create-request.dto';

export class EditRequestDto extends PartialType(
  CreateRequestDto,
) {}
