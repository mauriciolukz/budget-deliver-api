import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Driver } from './entities/driver.entity';
import { AppWindow } from './entities/appWindow.entity';
import { DriversController } from './controllers/drivers.controller';
import { DriversService } from './services/drivers.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, AppWindow, Driver])],
  controllers: [UsersController, DriversController],
  providers: [UsersService, DriversService],
  exports: [UsersService],
})
export class UsersModule {}
