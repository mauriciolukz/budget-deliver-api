import { IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IVehicleItem } from '../types/vehicle-item';

export class CreateVehicleItemsDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly items: IVehicleItem[];
}

export class UpdateOrderItemDto extends PartialType(CreateVehicleItemsDto) {}
