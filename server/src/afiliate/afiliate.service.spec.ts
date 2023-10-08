import { Test, TestingModule } from '@nestjs/testing';
import { AfiliateService } from './afiliate.service';
import { AfiliateEntity } from '../entities';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AfiliateService', () => {
  let service: AfiliateService;
  let afiliateRepository: Repository<AfiliateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AfiliateService,
        {
          provide: getRepositoryToken(AfiliateEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AfiliateService>(AfiliateService);
    afiliateRepository = module.get<Repository<AfiliateEntity>>(
      getRepositoryToken(AfiliateEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of afiliates', async () => {
      const afiliates: AfiliateEntity[] = [
        {
          date: new Date(),
          value: 100.0,
          name: 'Afiliate 1',
          id: 1,
        },
        {
          date: new Date(),
          value: 150.0,
          name: 'Afiliate 2',
          id: 2,
        },
        {
          date: new Date(),
          value: 200.0,
          name: 'Afiliate 3',
          id: 3,
        },
        {
          date: new Date(),
          value: 75.0,
          name: 'Afiliate 4',
          id: 4,
        },
        {
          date: new Date(),
          value: 50.0,
          name: 'Afiliate 5',
          id: 5,
        },
      ];
      jest.spyOn(afiliateRepository, 'find').mockResolvedValueOnce(afiliates);

      const result = await service.findAll();
      expect(result).toEqual(afiliates);
    });
  });

  describe('findById', () => {
    it('should return an afiliate by ID', async () => {
      const afiliateToFind: AfiliateEntity = {
        date: new Date(),
        value: 100.0,
        name: 'Afiliate 1',
        id: 1,
      };

      jest
        .spyOn(afiliateRepository, 'findOne')
        .mockResolvedValueOnce(afiliateToFind);

      const result = await service.findById(1);
      expect(result).toEqual(afiliateToFind);
    });

    it('should return null when an afiliate with the given ID is not found', async () => {
      jest.spyOn(afiliateRepository, 'findOne').mockResolvedValueOnce(null);

      const result = await service.findById(999);
      expect(result).toBeNull();
    });
  });

  describe('findByName', () => {
    it('should return an array of afiliates by name', async () => {
      const name = 'John Doe';
      const afiliates: AfiliateEntity[] = [
        {
          date: new Date(),
          value: 100.0,
          name: 'John Doe',
          id: 1,
        },
        {
          date: new Date(),
          value: 150.0,
          name: 'Afiliate 2',
          id: 2,
        },
        {
          date: new Date(),
          value: 200.0,
          name: 'Afiliate 3',
          id: 3,
        },
        {
          date: new Date(),
          value: 75.0,
          name: 'Afiliate 4',
          id: 4,
        },
        {
          date: new Date(),
          value: 50.0,
          name: 'Afiliate 5',
          id: 5,
        },
      ];
      jest.spyOn(afiliateRepository, 'findBy').mockResolvedValueOnce(afiliates);

      const result = await service.findByName(name);
      expect(result).toEqual(afiliates);
    });
  });

  describe('delete', () => {
    it('should delete an afiliate by ID', async () => {
      const idToDelete = 1;
      jest
        .spyOn(afiliateRepository, 'delete')
        .mockResolvedValueOnce({ raw: { affectedRows: 1 } });

      await service.delete(idToDelete);

      expect(afiliateRepository.delete).toHaveBeenCalledWith(idToDelete);
    });

    it('should not throw an error when an afiliate with the given ID is not found', async () => {
      const idToDelete = 999;
      jest
        .spyOn(afiliateRepository, 'delete')
        .mockResolvedValueOnce({ raw: { affectedRows: 1 } });

      await expect(service.delete(idToDelete)).resolves.not.toThrow();
    });
  });
});
