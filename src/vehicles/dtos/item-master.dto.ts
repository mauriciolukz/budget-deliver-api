import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsEnum,
  IsOptional,
  Min,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ItemType } from '../enums/item-type';

export class CreateItemMasterDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty({ message: `Descripción no puede estar vacío` })
  readonly description: string;

  @IsEnum(ItemType)
  @IsPositive()
  @IsNumber()
  @ApiProperty({
    enum: [ItemType.Partes, ItemType.Accesorios, ItemType.Documentos],
  })
  @IsNotEmpty({ message: 'Tipo de item no puede estar vacío' })
  readonly itemType: ItemType;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false, required: false })
  readonly useQty: boolean;
}

export class UpdateItemMasterDto extends PartialType(CreateItemMasterDto) {}

export class FilterItemsMasterDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @ApiProperty()
  limit?: number | null;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset?: number | null;
}
