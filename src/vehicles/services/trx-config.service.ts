import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTransactionConfigDto } from '../dtos/trx-config.dto';
import { TransactionConfig } from '../entities/trx-config.entity';

@Injectable()
export class TransactionConfigsService {
  constructor(
    @InjectRepository(TransactionConfig)
    private documentConfigsRepo: Repository<TransactionConfig>,
  ) {}

  getByType(trxType: number) {
    return this.documentConfigsRepo.findOneBy({ trxType });
  }

  async update(id: number, changes: UpdateTransactionConfigDto) {
    const document = await this.documentConfigsRepo.findOneBy({ id });
    if (!document) throw new NotFoundException();
    const merge = await this.documentConfigsRepo.merge(document, changes);
    return this.documentConfigsRepo.save(merge);
  }
}
