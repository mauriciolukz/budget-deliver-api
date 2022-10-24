import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import {
  RimMarkCondition,
  RimType,
  TyreMarkCondition,
} from '../enums/wheel-type';

export class CreateTrxWheelDto {
  @ApiProperty({ required: false })
  readonly spare: boolean;

  @IsNumber()
  @ApiProperty()
  readonly tyrePressureLevel: number;

  @IsNumber()
  @ApiProperty()
  readonly tyreUsefulLife: number;

  @ApiProperty({ required: false })
  @ValidateIf((o) => o.tyreUsefulLife >= 50, {
    message: 'Agregar observación si vida util es mayor que 49%',
  })
  @IsNotEmpty()
  readonly tyreUsfLifeRemark: string;

  @IsEnum(TyreMarkCondition, {
    message: 'Condición de marca-neumatico no válido',
  })
  @ApiProperty({ enum: TyreMarkCondition })
  readonly tyreMarkCondition: TyreMarkCondition;

  @IsEnum(RimType, { message: 'Condición de rim no válido' })
  @ApiProperty({ enum: RimType })
  readonly rimType: RimType;

  @IsString()
  @ApiProperty()
  readonly rimPainting: string;

  @IsEnum(RimMarkCondition, { message: 'Condición de marca-rim no válido' })
  @ApiProperty({ enum: RimMarkCondition })
  readonly rimMarkCondition: RimMarkCondition;
}
