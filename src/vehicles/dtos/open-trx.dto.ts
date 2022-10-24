import { IsEnum, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FuelLevel } from '../enums/fuel-level';
import { TrxCheck } from '../enums/trx-check';

export class CreateTransactionDto {
  @Min(1)
  @ApiProperty()
  readonly trxType: number;

  @Min(1)
  @ApiProperty()
  readonly vehicleId: number;

  @IsEnum(TrxCheck, { message: 'Revisión no válido' })
  @ApiProperty({ enum: TrxCheck })
  readonly check: TrxCheck;
}

export class UpdateTransactionDto {
  @IsNumber()
  @ApiProperty({ required: false })
  readonly km: number;

  @IsEnum(FuelLevel, { message: 'Nivel de combustible no válido' })
  @ApiProperty({ required: false })
  readonly fuelLevel: FuelLevel;
}
