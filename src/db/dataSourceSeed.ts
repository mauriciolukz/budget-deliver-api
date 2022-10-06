import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();
const ssl =
  process.env.NODE_ENV === 'prod'
    ? {
        rejectUnauthorized: false,
      }
    : null;

const db: DataSourceOptions = {
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  logging: true,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{ts, js}'],
  migrations: ['src/db/seeds/*.ts'],
  ssl,
};
export const dataSource = new DataSource(db);
