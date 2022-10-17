import { Module } from '@nestjs/common';
import { VehiclesService } from './services/vehicles.service';
import { VehiclesController } from './controllers/vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './models/vehicle.entity';
import { ItemsMasterController } from './controllers/items-master.controller';
import { ItemsMasterService } from './services/items-master.service';
import { ItemMaster } from './models/item-master.entity';
import { VehicleItemsController } from './controllers/vehicle-items.controller';
import { VehicleItemsService } from './services/vehicle-items.service';
import { VehicleItem } from './models/vehicle-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, ItemMaster, VehicleItem])],
  providers: [VehiclesService, ItemsMasterService, VehicleItemsService],
  controllers: [
    VehiclesController,
    ItemsMasterController,
    VehicleItemsController,
  ],
})
export class VehiclesModule {}
