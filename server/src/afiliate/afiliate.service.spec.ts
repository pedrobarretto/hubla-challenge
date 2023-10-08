import { Test, TestingModule } from '@nestjs/testing';
import { AfiliateService } from './afiliate.service';

describe('AfiliateService', () => {
  let service: AfiliateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AfiliateService],
    }).compile();

    service = module.get<AfiliateService>(AfiliateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
