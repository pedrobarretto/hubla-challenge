/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { AfiliateEntity, SaleEntity, SellerEntity } from '../entities';
import { NotFoundException } from '@nestjs/common';
import { SellersService } from '../sellers/sellers.service';
import { AfiliateService } from '../afiliate/afiliate.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('SalesController', () => {
  let controller: SalesController;
  let salesService: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([SaleEntity, SellerEntity, AfiliateEntity]),
      ],
      controllers: [SalesController],
      providers: [
        SalesService,
        {
          provide: getRepositoryToken(SaleEntity),
          useClass: Repository,
        },
        SellersService,
        {
          provide: getRepositoryToken(SellerEntity),
          useClass: Repository,
        },
        AfiliateService,
        {
          provide: getRepositoryToken(AfiliateEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<SalesController>(SalesController);
    salesService = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of sale entities', async () => {
      const result: SaleEntity[] = [
        {
          date: new Date(),
          id: 1,
          product: 'DESENVOLVEDOR FULL STACK',
          seller: 'Afiliate 1',
          type: 2,
          value: 100.0,
        },
      ];
      jest.spyOn(salesService, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a sale entity with a valid ID', async () => {
      const sale = new SaleEntity();
      jest.spyOn(salesService, 'findById').mockResolvedValue(sale);

      expect(await controller.findOne(1)).toBe(sale);
    });

    it('should throw a NotFoundException with an invalid ID', async () => {
      jest.spyOn(salesService, 'findById').mockResolvedValue(null);

      try {
        await controller.findOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findBySeller', () => {
    it('should return an array of sale entities for a valid seller', async () => {
      const result: SaleEntity[] = [
        {
          date: new Date(),
          id: 1,
          product: 'DESENVOLVEDOR FULL STACK',
          seller: 'Afiliate 1',
          type: 2,
          value: 100.0,
        },
      ];
      jest.spyOn(salesService, 'findBySeller').mockResolvedValue(result);

      expect(await controller.findBySeller({ seller: 'John Doe' })).toBe(
        result,
      );
    });

    it('should throw a NotFoundException with an invalid seller', async () => {
      jest.spyOn(salesService, 'findBySeller').mockResolvedValue([]);

      try {
        await controller.findBySeller({ seller: 'Nonexistent Seller' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create sale entities based on .txt upload', async () => {
      const result: SaleEntity[] = [
        {
          date: new Date(),
          id: 1,
          product: 'DESENVOLVEDOR FULL STACK',
          seller: 'Afiliate 1',
          type: 2,
          value: 100.0,
        },
      ];
      jest.spyOn(salesService, 'create').mockResolvedValue(result);

      expect(await controller.create({ sale: 'Sale data' })).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a sale entity with a valid ID', async () => {
      const sale = new SaleEntity();
      jest.spyOn(salesService, 'findById').mockResolvedValue(sale);

      expect(await controller.update(1, sale)).toBeUndefined();
    });

    it('should throw a NotFoundException with an invalid ID', async () => {
      jest.spyOn(salesService, 'findById').mockResolvedValue(null);

      try {
        await controller.update(999, new SaleEntity());
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should delete a sale entity with a valid ID', async () => {
      const sale = new SaleEntity();
      jest.spyOn(salesService, 'findById').mockResolvedValue(sale);

      expect(await controller.delete(1)).toBeUndefined();
    });

    it('should throw a NotFoundException with an invalid ID', async () => {
      jest.spyOn(salesService, 'findById').mockResolvedValue(null);

      try {
        await controller.delete(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
