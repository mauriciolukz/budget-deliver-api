import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { dataSource } from '../dataSourceSeed';
import { User } from '../../users/entities/user.entity';

export class createUsers1664991185295 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('123', 10);
    await dataSource.getRepository(User).save([
      {
        username: 'admin',
        password: password,
        role: 'admin',
        email: 'admin@budget.com.ni',
      },
      {
        username: 'flota',
        password: password,
        role: 'flota',
        email: 'flota@budget.com.ni',
      },
      {
        username: 'taller',
        password: password,
        role: 'taller',
        email: 'taller@budget.com.ni',
      },
      {
        username: 'recibidor',
        password: password,
        role: 'recibidor',
        email: 'recibidor@budget.com.ni',
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `DELETE FROM user WHERE username in ('admin','flota','taller','recibidor')`,
    );
  }
}
