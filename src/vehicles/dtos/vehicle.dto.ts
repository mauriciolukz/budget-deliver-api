import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  IsDate,
  MaxLength,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { FuelLevel } from '../enums/fuel-level';

export class CreateVehicleDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty({ message: `MVA no puede estar vacío` })
  readonly MVA: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty({ message: 'Marca no puede estar vacío' })
  readonly make: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Modelo no puede estar vacío' })
  readonly model: string;

  @IsString()
  @ApiProperty({ required: false, default: '' })
  readonly color: string;

  @IsString()
  @ApiProperty({ required: false, default: '' })
  readonly plateNum: string;

  @IsString()
  @ApiProperty({ required: false, default: '' })
  keyNum: string;

  @ApiProperty({ required: false, default: 0 })
  @IsNumber({}, { message: 'Kilometraje actual debe ser número' })
  readonly currentKm: number;

  @ApiProperty({ enum: FuelLevel, required: false, default: '' })
  @IsOptional()
  @IsEnum(FuelLevel, { message: 'Nivel de gasolina no válido' })
  readonly fuelLevel: FuelLevel;

  @ApiProperty({ required: false, default: '' })
  @IsOptional()
  @MaxLength(255, {
    message: 'Campo observaciones no puede exceder los 255 caracteres',
  })
  readonly remark: string;

  @IsDate({ message: 'Fecha del ultimo cambio de aceite no válido' })
  @ApiProperty({ required: false, default: null })
  @IsOptional()
  readonly lastOilChangeDate: Date;

  @IsDate({ message: 'Fecha de próximo cambio de aceite no válido' })
  @ApiProperty({ required: false, default: null })
  @IsOptional()
  readonly nextOilChangeDate: Date;

  @IsDate({ message: 'Km próximo cambio de aceite no válido' })
  @ApiProperty({ required: false, default: null })
  @IsOptional()
  readonly nextOilChangeKm: number;
}

export class UpdateVehicleDto extends OmitType(CreateVehicleDto, [
  'MVA',
] as const) {
  // @ValidateNested({ message: 'MVA no admitido' })
  readonly MVA: string;
}

export class FilterVehiclesDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @ApiProperty({ required: false })
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ required: false })
  offset: number;
}

export class FilterMVADto {
  @IsString()
  @ApiProperty()
  readonly MVA: string;
}
