import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { Public } from './auth/decorators/public.decorators';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(ApiKeyGuard)
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
