import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/user.entity';
import { IToken } from '../models/token.model';

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

  async generateJWT(user: User) {
    const payload: IToken = { role: user.role, sub: user.id };
    const role = await this.userService.findRol(payload.role);
    return {
      token: this.jwtService.sign(payload),
      user,
      role,
    };
  }
}
