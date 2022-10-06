import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { environments } from 'src/environments';
import { DbModule } from './db/db.module';
import config from './config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      // Validar variables de entorno requeridas para iniciar el servidor
      validationSchema: Joi.object({
        // MYSQL_DATABASE: Joi.string().required(),
        // MYSQL_PORT: Joi.number().required(),
        // MYSQL_ROOT_PASSWORD: Joi.string().required(),
        // MYSQL_HOST: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    UsersModule,
    DbModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
