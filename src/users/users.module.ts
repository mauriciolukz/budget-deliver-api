import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { AppWindow } from './entities/appWindow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, AppWindow])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
