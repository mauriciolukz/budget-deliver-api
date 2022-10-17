import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateVehicleItemsDto } from '../dtos/vehicle-item.dto';
import { VehicleItemsService } from '../services/vehicle-items.service';
import { IVehicleItem } from '../types/vehicle-item';

@UseGuards(AuthGuard('jwt'))
@Controller('api/vehicles/')
export class VehicleItemsController {
  constructor(private vehicleItemsService: VehicleItemsService) {}

  @Post(':id/accesories')
  updateItems(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateVehicleItemsDto,
  ) {
    return this.vehicleItemsService.update(id, payload);
  }
}
