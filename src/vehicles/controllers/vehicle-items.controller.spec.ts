import { Test, TestingModule } from '@nestjs/testing';
import { VehicleItemsController } from './vehicle-items.controller';

describe('VehicleItemController', () => {
  let controller: VehicleItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleItemsController],
    }).compile();

    controller = module.get<VehicleItemsController>(VehicleItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
