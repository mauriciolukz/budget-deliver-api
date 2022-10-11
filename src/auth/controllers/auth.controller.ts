import { Controller, Body, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('auth')
  login(@Body() data: LoginDto, @Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user, data.platform);
  }
}
