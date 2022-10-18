import { Test, TestingModule } from '@nestjs/testing';
import { FuelLevelsController } from './fuel-levels.controller';

describe('FuelLevelsController', () => {
  let controller: FuelLevelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelLevelsController],
    }).compile();

    controller = module.get<FuelLevelsController>(FuelLevelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
