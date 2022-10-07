import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();
const ssl =
  process.env.NODE_ENV === 'production'
    ? {
        rejectUnauthorized: false,
      }
    : null;

const db: DataSourceOptions = {
  type: 'mssql',
  database: configService.get('DB_NAME'),
  host: configService.get('DB_HOST'),
  port: parseInt(configService.get('DB_PORT'), 10),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  options: { encrypt: false },
  logging: true,
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{ts, js}'],
  migrations: ['src/db/seeds/*.ts'],
};
export const dataSource = new DataSource(db);
