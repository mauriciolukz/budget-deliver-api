import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 60 })
  readonly locationCode: string;

  @IsString()
  @ApiProperty({ maxLength: 255, required: false })
  readonly address: string;

  @IsString()
  @ApiProperty({ maxLength: 30, required: false })
  readonly phone1: string;

  @IsString()
  @ApiProperty({ maxLength: 30, required: false })
  readonly phone2: string;
}

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}
