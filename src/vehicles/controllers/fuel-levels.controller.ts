import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FuelLevel } from '../types/fuel-level';

@UseGuards(AuthGuard('jwt'))
@Controller('api/fuel-levels')
export class FuelLevelsController {
  @Get()
  getAll() {
    return Object.keys(FuelLevel);
  }
}
