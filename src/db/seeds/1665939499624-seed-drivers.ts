import { Driver } from 'src/users/entities/driver.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { dataSource } from '../dataSourceSeed';

export class seedDrivers1665939499624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const driversRepo = dataSource.getRepository(Driver);
    await driversRepo.insert([
      {
        firstName: 'José',
        middleName: 'Miguel',
        lastName: 'Sequeira Mora',
        phone1: '88774455',
      },
      {
        firstName: 'David',
        middleName: 'Antonia',
        lastName: 'Meza Pilarte',
        phone1: '78662245',
      },
      {
        firstName: 'Ernesto',
        middleName: 'Manuel',
        lastName: 'Campursano',
        phone1: '87962358',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE driver');
  }
}
