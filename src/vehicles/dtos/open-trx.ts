import { IsEnum, IsNumber, Min } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { FuelLevel } from '../types/fuel-level';

export class CreateTransactionDto {
  @Min(1)
  @ApiProperty()
  readonly trxType: number;

  @Min(1)
  @ApiProperty()
  readonly vehicleId: number;
}

export class UpdateTransactionDto {
  @IsNumber()
  @ApiProperty({ required: false })
  readonly km: number;

  @IsEnum(FuelLevel, { message: 'Nivel de combustible no válido' })
  @ApiProperty({ required: false })
  readonly fuelLevel: FuelLevel;
}
