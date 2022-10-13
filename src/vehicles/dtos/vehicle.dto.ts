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
import { GasLevel } from '../types/gasLevel';

export class CreateVehicleDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty({ message: `Campo MVA obligatorio` })
  readonly MVA: string;
  @IsString()
  @ApiProperty()
  @IsNotEmpty({ message: 'Campo Marca obligatorio' })
  readonly make: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Campo Modelo obligatorio' })
  readonly model: string;
  @IsString()
  @ApiProperty()
  readonly color: string;
  @IsString()
  @ApiProperty()
  readonly plateNum: string;
  @IsString()
  @ApiProperty()
  keyNum: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'Kilometraje actual debe ser número' })
  readonly currentKm: number;
  @ApiProperty()
  @IsOptional()
  @IsEnum(GasLevel, { message: 'Nivel de gasolina no válido' })
  readonly gasLevel: GasLevel;
  @ApiProperty()
  @IsOptional()
  @MaxLength(255, {
    message: 'Campo observaciones no puede exceder los 255 caracteres',
  })
  readonly remark: string;
  @IsDate({ message: 'Fecha del ultimo cambio de aceite no válido' })
  @ApiProperty()
  @IsOptional()
  readonly lastOilChangeDate: Date;
  @IsDate({ message: 'Fecha de próximo cambio de aceite no válido' })
  @ApiProperty()
  @IsOptional()
  readonly nextOilChangeDate: Date;
  @IsDate({ message: 'Km próximo cambio de aceite no válido' })
  @ApiProperty()
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
  @ApiProperty()
  limit: number;

  @IsOptional()
  @IsPositive()
  @Min(0)
  @ApiProperty()
  offset: number;
}

export class FilterMVADto {
  @IsString()
  @ApiProperty()
  readonly MVA: string;
}
