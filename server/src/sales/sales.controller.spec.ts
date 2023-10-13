import { Test, TestingModule } from '@nestjs/testing';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { AfiliateEntity, SaleEntity, SellerEntity } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AfiliateService } from '../afiliate/afiliate.service';
import { SellersService } from '../sellers/sellers.service';
import { NotFoundException } from '@nestjs/common';

describe('SalesController', () => {
  let controller: SalesController;
  let salesService: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [
        SalesService,
        SellersService,
        AfiliateService,
        {
          provide: getRepositoryToken(SaleEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(AfiliateEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(SellerEntity),
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
    it('should return all sales', async () => {
      const sales: SaleEntity[] = [
        {
          id: 1,
          type: 1,
          date: new Date(),
          product: 'Product 1',
          value: 100.0,
          seller: 'Seller 1',
        },
        {
          id: 2,
          type: 1,
          date: new Date(),
          product: 'Product 2',
          value: 100.0,
          seller: 'Seller 2',
        },
      ];

      jest.spyOn(salesService, 'findAll').mockResolvedValueOnce(sales);

      const result = await controller.findAll();
      expect(result).toEqual(sales);
    });
  });

  describe('findOne', () => {
    it('should return a sale by id', async () => {
      const saleId = 1;
      const sale: SaleEntity = {
        id: saleId,
        type: 1,
        date: new Date(),
        product: 'Product 1',
        value: 100.0,
        seller: 'Seller 1',
      };

      jest.spyOn(salesService, 'findById').mockResolvedValueOnce(sale);

      const result = await controller.findOne(saleId);
      expect(result).toEqual(sale);
    });

    it('should throw NotFoundException when sale by id is not found', async () => {
      const saleId = 999;
      jest.spyOn(salesService, 'findById').mockResolvedValueOnce(null);

      try {
        await controller.findOne(saleId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findBySeller', () => {
    it('should return sales by seller name', async () => {
      const sellerName = 'Seller 1';
      const sales: SaleEntity[] = [
        {
          id: 1,
          type: 1,
          date: new Date(),
          product: 'Product 1',
          value: 100.0,
          seller: sellerName,
        },
        {
          id: 2,
          type: 1,
          date: new Date(),
          product: 'Product 2',
          value: 150.0,
          seller: sellerName,
        },
      ];

      jest.spyOn(salesService, 'findBySeller').mockResolvedValueOnce(sales);

      const result = await controller.findBySeller({ seller: sellerName });
      expect(result).toEqual(sales);
    });

    it('should throw NotFoundException when sales by seller name are not found', async () => {
      const sellerName = 'Nonexistent Seller';
      jest.spyOn(salesService, 'findBySeller').mockResolvedValueOnce([]);

      try {
        await controller.findBySeller({ seller: sellerName });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a sale', async () => {
      const newSale: SaleEntity = {
        id: 1,
        type: 1,
        date: new Date(),
        product: 'Product 1',
        value: 100.0,
        seller: 'Seller 1',
      };

      jest.spyOn(salesService, 'create').mockResolvedValueOnce([newSale]);

      const result = await controller.create({ sale: JSON.stringify(newSale) });
      expect(result).toEqual([newSale]);
    });
  });

  describe('update', () => {
    it('should update a sale', async () => {
      const saleId = 1;
      const updatedSale: SaleEntity = {
        id: saleId,
        type: 1,
        date: new Date(),
        product: 'Updated Product',
        value: 150.0,
        seller: 'Updated Seller',
      };

      jest.spyOn(salesService, 'findById').mockResolvedValueOnce(updatedSale);
      jest.spyOn(salesService, 'update').mockResolvedValueOnce(null);

      await controller.update(saleId, updatedSale);

      expect(salesService.update).toHaveBeenCalledWith(saleId, updatedSale);
    });

    it('should throw NotFoundException when updating a non-existing sale', async () => {
      const saleId = 999;
      const updatedSale: SaleEntity = {
        id: saleId,
        type: 1,
        date: new Date(),
        product: 'Updated Product',
        value: 150.0,
        seller: 'Updated Seller',
      };

      jest.spyOn(salesService, 'findById').mockResolvedValueOnce(null);

      try {
        await controller.update(saleId, updatedSale);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should delete a sale', async () => {
      const saleId = 1;

      jest.spyOn(salesService, 'findById').mockResolvedValueOnce({
        id: saleId,
        type: 1,
        date: new Date(),
        product: 'Product 1',
        value: 100.0,
        seller: 'Seller 1',
      });

      jest.spyOn(salesService, 'delete').mockResolvedValueOnce(undefined);

      await controller.delete(saleId);
      expect(salesService.delete).toHaveBeenCalledWith(saleId);
    });

    it('should throw NotFoundException when deleting a non-existing sale', async () => {
      const saleId = 999;
      jest.spyOn(salesService, 'findById').mockResolvedValueOnce(null);

      try {
        await controller.delete(saleId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
