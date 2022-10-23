import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTransactionDto, UpdateTransactionDto } from '../dtos/open-trx';
import { OpenTransaction } from '../entities/open-trx.entity';
import { OpenTransactionsService } from '../services/open-transactions.service';

@UseGuards(JwtAuthGuard)
@Controller('api/transactions')
export class TransactionsController {
  constructor(private openTransactionsService: OpenTransactionsService) {}
  @Get()
  getAll() {
    return this.openTransactionsService.findAll();
  }

  @Post()
  create(@Request() req, @Body() payload: CreateTransactionDto) {
    return this.openTransactionsService.create(payload, req.user.username);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTransactionDto,
  ): Promise<OpenTransaction> {
    return this.openTransactionsService.update(id, payload);
  }
}
