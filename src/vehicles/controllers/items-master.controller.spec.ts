import { Test, TestingModule } from '@nestjs/testing';
import { ItemsMasterController } from './items-master.controller';

describe('ItemsMasterController', () => {
  let controller: ItemsMasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsMasterController],
    }).compile();

    controller = module.get<ItemsMasterController>(ItemsMasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
