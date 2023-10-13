import { Test, TestingModule } from '@nestjs/testing';
import { SellersService } from './sellers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SellerEntity, SaleEntity } from '../entities';
import { SaleType } from '../interfaces';
import { Repository } from 'typeorm';

describe('SellersService', () => {
  let service: SellersService;
  let repository: Repository<SellerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SellersService,
        {
          provide: getRepositoryToken(SellerEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SellersService>(SellersService);
    repository = module.get<Repository<SellerEntity>>(
      getRepositoryToken(SellerEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should find all sellers', async () => {
      const sellers: SellerEntity[] = [
        {
          date: new Date(),
          value: 100.0,
          name: 'Seller 1',
          id: 1,
        },
        {
          date: new Date(),
          value: 150.0,
          name: 'Seller 2',
          id: 2,
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValueOnce(sellers);

      const result = await service.findAll();
      expect(result).toEqual(sellers);
    });
  });

  describe('findById', () => {
    it('should find a seller by id', async () => {
      const sellerId = 1;
      const seller: SellerEntity = {
        date: new Date(),
        value: 100.0,
        name: 'Seller 1',
        id: sellerId,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(seller);

      const result = await service.findById(sellerId);
      expect(result).toEqual(seller);
    });
  });

  describe('findByName', () => {
    it('should find sellers by name', async () => {
      const sellerName = 'Seller 1';
      const sellers: SellerEntity[] = [
        {
          date: new Date(),
          value: 100.0,
          name: sellerName,
          id: 1,
        },
        {
          date: new Date(),
          value: 150.0,
          name: sellerName,
          id: 2,
        },
      ];

      jest.spyOn(repository, 'findBy').mockResolvedValueOnce(sellers);

      const result = await service.findByName(sellerName);
      expect(result).toEqual(sellers);
    });
  });

  describe('create', () => {
    it('should create sellers from sales list', async () => {
      const salesList: Partial<SaleEntity[]> = [
        {
          date: new Date(),
          value: 100.0,
          seller: 'Seller 1',
          type: SaleType.productorSale,
          id: 1,
          product: 'DESENVOLVEDOR FULL STACK',
        },
        {
          date: new Date(),
          value: 150.0,
          seller: 'Seller 2',
          type: SaleType.productorSale,
          id: 1,
          product: 'DESENVOLVEDOR FULL STACK',
        },
      ];

      const sellers: SellerEntity[] = [
        {
          date: new Date(),
          value: 100.0,
          name: 'Seller 1',
          id: 1,
        },
        {
          date: new Date(),
          value: 150.0,
          name: 'Seller 2',
          id: 2,
        },
      ];

      const repository = {
        findOne: jest
          .fn()
          .mockResolvedValueOnce(null)
          .mockResolvedValueOnce(null),
        create: jest.fn((data) => ({
          ...new SellerEntity(),
          ...data,
          date: new Date(),
        })),
        save: jest
          .fn()
          .mockResolvedValueOnce(sellers[0])
          .mockResolvedValueOnce(sellers[1]),
        update: jest.fn().mockResolvedValueOnce({
          affected: 1,
          raw: null,
          generatedMaps: [],
        }),
      };

      const service = new SellersService(repository as any);

      const result = await service.create(salesList);
      expect(result).toEqual(sellers);
    });
  });

  describe('update', () => {
    it('should update a seller', async () => {
      const sellerId = 1;
      const updatedSeller: Partial<SellerEntity> = {
        value: 200.0,
      };

      jest.spyOn(repository, 'update').mockResolvedValueOnce({
        affected: 1,
        raw: null,
        generatedMaps: [],
      });

      await service.update(sellerId, updatedSeller);

      expect(repository.update).toHaveBeenCalledWith(sellerId, updatedSeller);
    });
  });

  describe('delete', () => {
    it('should delete a seller', async () => {
      const sellerId = 1;

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
        date: new Date(),
        value: 100.0,
        name: 'Seller 1',
        id: sellerId,
      });
      jest.spyOn(repository, 'delete').mockResolvedValueOnce({
        affected: 1,
        raw: null,
      });

      await service.delete(sellerId);

      expect(repository.delete).toHaveBeenCalledWith(sellerId);
    });
  });
});
