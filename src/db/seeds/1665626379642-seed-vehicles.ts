import { MigrationInterface, QueryRunner } from 'typeorm';
import { dataSource } from '../dataSourceSeed';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { FuelLevel } from 'src/vehicles/enums/fuel-level';
import { VehicleItem } from 'src/vehicles/entities/vehicle-item.entity';

export class seedVehicles1665626379642 implements MigrationInterface {
  public async up(): Promise<void> {
    const vehiclesRepo = dataSource.getRepository(Vehicle);
    const vehicleItemsRepo = dataSource.getRepository(VehicleItem);
    const vehicleItems = await vehicleItemsRepo.find();
    await vehicleItemsRepo.remove(vehicleItems);
    await vehiclesRepo.insert([
      {
        MVA: `${Math.floor(Math.random() * 3000000)}`,
        make: 'Toyota',
        model: 'Camry',
        color: 'Blanco',
        plateNum: `M-${Math.floor(Math.random() * 9000)}`,
        keyNum: `${Math.floor(Math.random() * 30000)}`,
        isAvailable: false,
      },
      {
        MVA: `${Math.floor(Math.random() * 3000000)}`,
        make: 'Toyota',
        model: 'Landcruiser',
        color: 'Blanco',
        plateNum: `M-${Math.floor(Math.random() * 9000)}`,
        keyNum: `${Math.floor(Math.random() * 30000)}`,
      },
      {
        MVA: `${Math.floor(Math.random() * 3000000)}`,
        make: 'Toyota',
        model: 'Yaris',
        color: 'Blanco',
        plateNum: `M-${Math.floor(Math.random() * 9000)}`,
        keyNum: `${Math.floor(Math.random() * 30000)}`,
        isAvailable: false,
      },
      {
        MVA: `${Math.floor(Math.random() * 3000000)}`,
        make: 'Toyota',
        model: 'Prado',
        color: 'Blanco',
        plateNum: `M-${Math.floor(Math.random() * 9000)}`,
        keyNum: `${Math.floor(Math.random() * 30000)}`,
        fuelLevel: FuelLevel['5/8'],
      },
      {
        MVA: `${Math.floor(Math.random() * 3000000)}`,
        make: 'Nissan',
        model: 'Tiida',
        color: 'Blanco',
        plateNum: `M-${Math.floor(Math.random() * 9000)}`,
        keyNum: `${Math.floor(Math.random() * 30000)}`,
      },
      {
        MVA: `${Math.floor(Math.random() * 3000000)}`,
        make: 'Nissan',
        model: 'Sentra',
        color: 'rojo vino',
        plateNum: `M-${Math.floor(Math.random() * 9000)}`,
        keyNum: `${Math.floor(Math.random() * 30000)}`,
        fuelLevel: FuelLevel['7/8'],
      },
      {
        MVA: `${Math.floor(Math.random() * 3000000)}`,
        make: 'BMW',
        model: 'X6',
        color: 'negro',
        plateNum: `M-${Math.floor(Math.random() * 9000)}`,
        keyNum: `${Math.floor(Math.random() * 30000)}`,
        isAvailable: false,
        fuelLevel: FuelLevel['1/8'],
      },
      {
        MVA: `${Math.floor(Math.random() * 3000000)}`,
        make: 'Kia',
        model: 'rio',
        color: 'negro',
        plateNum: `M-${Math.floor(Math.random() * 9000)}`,
        keyNum: `${Math.floor(Math.random() * 30000)}`,
        isAvailable: false,
        fuelLevel: FuelLevel['3/8'],
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE vehicle');
  }
}
