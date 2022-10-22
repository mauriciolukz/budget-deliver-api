import { Min } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOpenTransactionDto {
  @Min(1)
  @ApiProperty()
  readonly documentType: number;

  @Min(1)
  @ApiProperty()
  readonly vehicleId: number;
}

export class UpdateOpenTransactionDto extends PartialType(
  CreateOpenTransactionDto,
) {}
