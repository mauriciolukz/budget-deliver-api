import { MigrationInterface, QueryRunner } from 'typeorm';
import { dataSource } from '../dataSourceSeed';
import { Vehicle } from 'src/vehicles/models/vehicle.entity';

export class seedVehicles1665626379642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const vehiclesRepo = dataSource.getRepository(Vehicle);
    await vehiclesRepo.insert([
      {
        MVA: `${Math.floor(Math.random() * 3000000)}`,
        make: 'Toyota',
        model: 'Camry',
        color: 'Blanco',
        plateNum: `M-${Math.floor(Math.random() * 9000)}`,
        keyNum: `${Math.floor(Math.random() * 30000)}`,
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
      },
      {
        MVA: `${Math.floor(Math.random() * 3000000)}`,
        make: 'Toyota',
        model: 'Prado',
        color: 'Blanco',
        plateNum: `M-${Math.floor(Math.random() * 9000)}`,
        keyNum: `${Math.floor(Math.random() * 30000)}`,
      },
      {
        MVA: `${Math.floor(Math.random() * 3000000)}`,
        make: 'Nissan',
        model: 'Tiida',
        color: 'Blanco',
        plateNum: `M-${Math.floor(Math.random() * 9000)}`,
        keyNum: `${Math.floor(Math.random() * 30000)}`,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
