import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateDriverDto, UpdateDriverDto } from '../dtos/driver.dto';
import { DriversService } from '../services/drivers.service';

@UseGuards(AuthGuard('jwt'))
@Controller('api/drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}
  @Get()
  findAll() {
    return this.driversService.findAll();
  }

  @Post()
  create(@Body() payload: CreateDriverDto) {
    return this.driversService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDriverDto,
  ) {
    return this.driversService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.driversService.remove(+id);
  }
}
