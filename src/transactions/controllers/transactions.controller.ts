import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOpenTransactionDto } from '../dtos/open-transaction.dto';
import { OpenTransactionsService } from '../services/open-transactions.service';

@UseGuards(JwtAuthGuard)
@Controller('api/openTransactions')
export class TransactionsController {
  constructor(private openTransactionsService: OpenTransactionsService) {}
  @Post()
  create(@Request() req, @Body() payload: CreateOpenTransactionDto) {
    return this.openTransactionsService.create(payload, req.user.username);
  }
}
