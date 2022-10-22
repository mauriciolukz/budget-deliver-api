import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions.controller';
import { OpenTransactionsService } from './services/open-transactions.service';
import { DocumentConfigsService } from './services/document-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentConfig } from './entities/document-config.entity';
import { OpenTransaction } from './entities/open-transaction.entity';
import { VehiclesModule } from 'src/vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentConfig, OpenTransaction]),
    VehiclesModule,
  ],
  controllers: [TransactionsController],
  providers: [OpenTransactionsService, DocumentConfigsService],
})
export class TransactionsModule {}
