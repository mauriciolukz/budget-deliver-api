import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { OpenTransactionsService } from '../services/open-transactions.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/vehicles')
export class VehiclesController {
  constructor(
    private vehiclesService: VehiclesService,
    private openTrxsService: OpenTransactionsService,
  ) {}

  @Get()
  getAll(@Query() params: FilterVehiclesDto) {
    return this.vehiclesService.findAll(params);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.findById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('getByMVA')
  getByMVA(@Body() data: FilterMVADto) {
    return this.vehiclesService.findByMVA(data.MVA);
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
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.vehiclesService.delete(id);
  }

  @Get(':vehicleId/open-transaction')
  getByVehicleId(@Param('vehicleId', ParseIntPipe) vehicleId: number) {
    return this.openTrxsService.findByVehicleId(vehicleId);
  }
}
