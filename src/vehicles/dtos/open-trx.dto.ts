import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FuelLevel } from '../enums/fuel-level';
import { TrxCheck } from '../enums/trx-check';
import { TrxType } from '../enums/trx-type';

export class CreateTransactionDto {
  @Min(1)
  @ApiProperty({ required: true })
  readonly trxType: number;

  @Min(1)
  @ApiProperty()
  readonly vehicleId: number;

  @IsEnum(TrxCheck, { message: 'Revisión no válido' })
  @ApiProperty({ enum: TrxCheck })
  readonly check: TrxCheck;

  @ApiProperty()
  @ValidateIf((o) => o.trxType === TrxType.transferencia)
  @IsNotEmpty({ message: 'Locación destino no debe estar vacío' })
  toLocation: string;
}

export class UpdateTransactionDto {
  @ApiProperty({ required: false })
  readonly trxKm: number;

  @IsEnum(FuelLevel, { message: 'Nivel de combustible no válido' })
  @ApiProperty({ required: false })
  readonly fuelLevel: FuelLevel;
}
