import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateVehicleDto,
  FilterMVADto,
  FilterVehiclesDto,
  UpdateVehicleDto,
} from '../dtos/vehicle.dto';
import { VehiclesService } from '../services/vehicles.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get()
  getAll(@Query() params: FilterVehiclesDto) {
    return this.vehiclesService.findAll(params);
  }

  @Post('getByMVA')
  getByMVA(@Body() data: FilterMVADto) {
    return this.vehiclesService.findOneByMVA(data.MVA);
  }

  @Post()
  create(@Body() data: CreateVehicleDto) {
    return this.vehiclesService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateVehicleDto,
  ) {
    return this.vehiclesService.update(id, data);
  }
  @Delete(':id')
  delete(
    @Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.update(id);
  }
}
