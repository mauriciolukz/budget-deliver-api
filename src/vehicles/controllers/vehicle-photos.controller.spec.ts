import { Test, TestingModule } from '@nestjs/testing';
import { VehiclePhotosController } from './vehicle-photos.controller';

describe('VehiclePhotosController', () => {
  let controller: VehiclePhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclePhotosController],
    }).compile();

    controller = module.get<VehiclePhotosController>(VehiclePhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
