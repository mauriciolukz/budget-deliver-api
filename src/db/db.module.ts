import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        // return {
        //   type: 'mysql',
        //   ...configService.mysql,
        //   autoLoadEntities: true,
        //   logging: true,
        //   ssl: {
        //     rejectUnauthorized: false,
        //   },
        // };
        return {
          type: 'postgres',
          url: configService.postgresUrl,
          synchronize: false,
          autoLoadEntities: true,
          logging: true,
          // ssl: {
          //   rejectUnauthorized: false,
          // },
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
