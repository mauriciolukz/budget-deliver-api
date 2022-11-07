import { Test, TestingModule } from '@nestjs/testing';
import { ItemsMasterService } from './items-master.service';

describe('DocumntsTypeService', () => {
  let service: ItemsMasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsMasterService],
    }).compile();

    service = module.get<ItemsMasterService>(ItemsMasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
