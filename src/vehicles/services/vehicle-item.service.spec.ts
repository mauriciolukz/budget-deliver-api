import { Test, TestingModule } from '@nestjs/testing';
import { VehicleItemsService } from './vehicle-items.service';

describe('VehicleItemsService', () => {
  let service: VehicleItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleItemsService],
    }).compile();

    service = module.get<VehicleItemsService>(VehicleItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
