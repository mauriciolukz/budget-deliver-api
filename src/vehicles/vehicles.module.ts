import { Module } from '@nestjs/common';
import { VehiclesService } from './services/vehicles.service';
import { VehiclesController } from './controllers/vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { ItemsMasterController } from './controllers/items-master.controller';
import { ItemsMasterService } from './services/items-master.service';
import { ItemMaster } from './entities/item-master.entity';
import { VehicleItemsController } from './controllers/vehicle-items.controller';
import { VehicleItemsService } from './services/vehicle-items.service';
import { VehicleItem } from './entities/vehicle-item.entity';
import { VehiclePhotosController } from './controllers/vehicle-photos.controller';
import { VehiclePhotosService } from './services/vehicle-photos.service';
import { VehiclePhoto } from './entities/vehicle-photo.entity';
import { FuelLevelsController } from './controllers/fuel-levels.controller';
import { OpenTransaction } from './entities/open-trx.entity';
import { TransactionConfig } from './entities/trx-config.entity';
import { OpenTransactionsService } from './services/open-transactions.service';
import { TransactionsController } from './controllers/transactions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vehicle,
      ItemMaster,
      VehicleItem,
      VehiclePhoto,
      OpenTransaction,
      TransactionConfig,
    ]),
  ],
  providers: [
    VehiclesService,
    ItemsMasterService,
    VehicleItemsService,
    VehiclePhotosService,
    OpenTransactionsService,
  ],
  controllers: [
    VehiclesController,
    ItemsMasterController,
    VehicleItemsController,
    VehiclePhotosController,
    FuelLevelsController,
    TransactionsController,
  ],
})
export class VehiclesModule {}
