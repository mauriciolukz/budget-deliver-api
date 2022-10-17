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
import { ItemType } from '../types/item-type';
import { Exclude } from 'class-transformer';

export class CreateItemMasterDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty({ message: `Descripción no puede estar vacío` })
  readonly description: string;

  @IsEnum(ItemType)
  @IsPositive()
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty({ message: 'Tipo de item no puede estar vacío' })
  readonly itemType: ItemType;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  readonly useQty: boolean;

  @Exclude()
  readonly createdAt: Date;

  @Exclude()
  readonly updatedAt: Date;
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
