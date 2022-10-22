import { Test, TestingModule } from '@nestjs/testing';
import { DocumntsTypeService } from './document-types.service';

describe('DocumntsTypeService', () => {
  let service: DocumntsTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumntsTypeService],
    }).compile();

    service = module.get<DocumntsTypeService>(DocumntsTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
