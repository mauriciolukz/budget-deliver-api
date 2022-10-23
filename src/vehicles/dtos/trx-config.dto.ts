import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateTransactionConfigDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 10 })
  readonly abrev: string;

  @IsString()
  @ApiProperty({ maxLength: 15 })
  readonly nextNumber: string;
}

export class UpdateTransactionConfigDto extends PartialType(
  CreateTransactionConfigDto,
) {}
