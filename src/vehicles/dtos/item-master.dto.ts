import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsEnum,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ItemType } from '../types/item-type';

export class CreateItemMasterDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty({ message: `Descripción no puede estar vacío` })
  readonly description: string;

  @IsEnum(ItemType)
  @IsPositive()
  @ApiProperty()
  @IsNotEmpty({ message: 'Tipo de item no puede estar vacío' })
  readonly itemType: ItemType;
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
