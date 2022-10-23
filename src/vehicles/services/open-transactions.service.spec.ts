import { Test, TestingModule } from '@nestjs/testing';
import { OpenTransactionsService } from './open-transactions.service';

describe('TransactionsService', () => {
  let service: OpenTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenTransactionsService],
    }).compile();

    service = module.get<OpenTransactionsService>(OpenTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
