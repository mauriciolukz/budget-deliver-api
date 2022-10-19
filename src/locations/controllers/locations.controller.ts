import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateLocationDto, UpdateLocationDto } from '../dtos/location.dto';
import { LocationsService } from '../services/locations.service';

@UseGuards(AuthGuard('jwt'))
@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number,) {
    return this.locationsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateLocationDto) {
    return this.locationsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateLocationDto,
  ) {
    return this.locationsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.locationsService.remove(+id);
  }
}
