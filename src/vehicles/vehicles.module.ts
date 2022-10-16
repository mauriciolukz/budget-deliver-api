import { Module } from '@nestjs/common';
import { VehiclesService } from './services/vehicles.service';
import { VehiclesController } from './controllers/vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './models/vehicle.entity';
import { ItemsMasterController } from './controllers/items-master.controller';
import { ItemsMasterService } from './services/items-master.service';
import { ItemMaster } from './models/item-master.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, ItemMaster])],
  providers: [VehiclesService, ItemsMasterService],
  controllers: [VehiclesController, ItemsMasterController],
})
export class VehiclesModule {}
