import { Test, TestingModule } from '@nestjs/testing';
import { VehiclePhotosService } from './vehicle-photos.service';

describe('VehiclePhotosService', () => {
  let service: VehiclePhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclePhotosService],
    }).compile();

    service = module.get<VehiclePhotosService>(VehiclePhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
