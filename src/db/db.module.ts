import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';
const ssl =
  process.env.NODE_ENV === 'production'
    ? {
        rejectUnauthorized: false,
      }
    : null;
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'mssql',
          ...configService.db_connection,
          autoLoadEntities: true,
          logging: true,
          synchronize: process.env.NODE_ENV === 'development',
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
