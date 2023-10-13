/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AfiliateEntity, SaleEntity, SellerEntity } from '../entities';
import { SellersService } from '../sellers/sellers.service';
import { AfiliateService } from '../afiliate/afiliate.service';

describe('SalesService', () => {
  let service: SalesService;
  let saleRepository: Repository<SaleEntity>;
  let sellersService: SellersService;
  let afiliateService: AfiliateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<SalesService>(SalesService);
    saleRepository = module.get<Repository<SaleEntity>>(
      getRepositoryToken(SaleEntity),
    );
    sellersService = module.get<SellersService>(SellersService);
    afiliateService = module.get<AfiliateService>(AfiliateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      jest.spyOn(saleRepository, 'find').mockResolvedValueOnce(sales);

      const result = await service.findAll();
      expect(result).toEqual(sales);
    });
  });

  describe('findById', () => {
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

      jest.spyOn(saleRepository, 'findOne').mockResolvedValueOnce(sale);

      const result = await service.findById(saleId);
      expect(result).toEqual(sale);
    });
  });

  describe('create', () => {
    it('should create sales', async () => {
      const salesContent: string =
        '12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS';
      const parsedSales: any[] = [
        {
          id: 1,
          type: 1,
          date: '2022-02-04T07:42:12-03:00',
          product: 'CURSO DE BEM-ESTAR',
          value: 127.5,
          seller: 'JOSE CARLOS',
        },
      ];

      jest.spyOn(saleRepository, 'create').mockImplementation((data) => ({
        ...new SaleEntity(),
        ...data,
        date: new Date(),
      }));
      jest.spyOn(saleRepository, 'save').mockResolvedValue(parsedSales[0]);
      jest.spyOn(sellersService, 'create').mockResolvedValue([]);
      jest.spyOn(afiliateService, 'create').mockResolvedValue([]);

      const result = await service.create(salesContent);
      expect(result).toEqual(parsedSales);
    });
  });

  describe('update', () => {
    it('should update a sale', async () => {
      const saleId = 1;

      const originalSale: SaleEntity = {
        id: saleId,
        type: 1,
        date: new Date(),
        product: 'Product 1',
        value: 100.0,
        seller: 'Seller 1',
      };

      const updatedSaleEntity: SaleEntity = {
        id: saleId,
        type: 1,
        date: new Date(),
        product: 'Product 1',
        value: 200.0,
        seller: 'Seller 1',
      };

      jest
        .spyOn(saleRepository, 'update')
        .mockResolvedValueOnce({ affected: 1, raw: null, generatedMaps: [] });
      jest
        .spyOn(saleRepository, 'findOne')
        .mockResolvedValueOnce(updatedSaleEntity);

      const result = await service.update(saleId, updatedSaleEntity);
      expect(result).toEqual(updatedSaleEntity);
    });
  });

  describe('delete', () => {
    it('should delete a sale', async () => {
      const saleId = 1;
      const sale: SaleEntity = {
        id: saleId,
        type: 1,
        date: new Date(),
        product: 'Product 1',
        value: 100.0,
        seller: 'Seller 1',
      };

      jest.spyOn(saleRepository, 'findOne').mockResolvedValueOnce(sale);
      jest
        .spyOn(saleRepository, 'delete')
        .mockResolvedValueOnce({ affected: 1, raw: null });

      await service.delete(saleId);
      expect(saleRepository.delete).toHaveBeenCalledWith(saleId);
    });
  });
});
