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
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from '../dtos/open-trx.dto';
import { CreateTrxWheelDto } from '../dtos/trx-wheel.dto';
import { OpenTransaction } from '../entities/open-trx.entity';
import { TrxWheel } from '../entities/trx-wheel.entity';
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

  @Get(':trxId/wheels')
  getAllWheels(
    @Param('trxId', ParseIntPipe) trxId: number,
  ): Promise<TrxWheel[]> {
    return this.openTransactionsService.findAllWheels(trxId);
  }

  @Post(':trxId/wheels')
  createWheels(
    @Param('trxId', ParseIntPipe) trxId: number,
    @Body() payload: CreateTrxWheelDto,
  ): Promise<TrxWheel> {
    return this.openTransactionsService.createWheel(trxId, payload);
  }

  @Delete(':trxId/wheels')
  deleteWheels(@Param('trxId', ParseIntPipe) trxId: number) {
    return this.openTransactionsService.deleteWheels(trxId);
  }
}
