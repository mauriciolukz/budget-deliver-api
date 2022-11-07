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
import { TrxWheel } from './entities/trx-wheel.entity';
import { Location } from 'src/locations/entities/location.entity';
import { LocationsService } from 'src/locations/services/locations.service';
import { LocationsController } from 'src/locations/controllers/locations.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vehicle,
      ItemMaster,
      VehicleItem,
      VehiclePhoto,
      OpenTransaction,
      TransactionConfig,
      TrxWheel,
      Location,
    ]),
  ],
  providers: [
    VehiclesService,
    ItemsMasterService,
    VehicleItemsService,
    VehiclePhotosService,
    OpenTransactionsService,
    LocationsService,
  ],
  controllers: [
    VehiclesController,
    ItemsMasterController,
    VehicleItemsController,
    VehiclePhotosController,
    FuelLevelsController,
    TransactionsController,
    LocationsController,
  ],
})
export class VehiclesModule {}
