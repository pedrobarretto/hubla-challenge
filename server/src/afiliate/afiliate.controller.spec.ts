import { Test, TestingModule } from '@nestjs/testing';
import { AfiliateController } from './afiliate.controller';

describe('AfiliateController', () => {
  let controller: AfiliateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AfiliateController],
    }).compile();

    controller = module.get<AfiliateController>(AfiliateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
