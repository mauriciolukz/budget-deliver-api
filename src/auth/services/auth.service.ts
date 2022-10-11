import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/user.entity';
import { IToken } from '../models/token.model';
import { RoleType } from 'src/users/types/roleType';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
    return null;
  }

  async generateJWT(user: User, platform: RoleType) {
    const payload: IToken = { role: user.role, sub: user.id };
    const role = await this.userService.findRol(payload.role);
    if (role.roleType !== platform)
      throw new ForbiddenException('Usuario no tiene acceso a esta plataforma');
    return {
      token: this.jwtService.sign(payload),
      user,
      role: role.roleType === RoleType.web ? null : role,
    };
  }
}
