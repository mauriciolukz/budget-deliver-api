import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();

const db: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  logging: true,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['src/db/migrations/*.ts'],
};
export const dataSource = new DataSource(db);
