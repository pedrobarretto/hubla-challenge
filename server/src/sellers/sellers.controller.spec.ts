import { Test, TestingModule } from '@nestjs/testing';
import { SellersController } from './sellers.controller';
import { SellersService } from './sellers.service';
import { SellerEntity } from '../entities';
import { getRepositoryToken } from '@nestjs/typeorm'; // Importe getRepositoryToken
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('SellersController', () => {
  let controller: SellersController;
  let sellersService: SellersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellersController],
      providers: [
        SellersService,
        {
          provide: getRepositoryToken(SellerEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<SellersController>(SellersController);
    sellersService = module.get<SellersService>(SellersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all sellers', async () => {
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
        {
          date: new Date(),
          value: 200.0,
          name: 'Seller 3',
          id: 3,
        },
        {
          date: new Date(),
          value: 75.0,
          name: 'Seller 4',
          id: 4,
        },
        {
          date: new Date(),
          value: 50.0,
          name: 'Seller 5',
          id: 5,
        },
      ];
      jest.spyOn(sellersService, 'findAll').mockResolvedValueOnce(sellers);

      const result = await controller.findAll();
      expect(result).toEqual(sellers);
    });
  });

  describe('findOne', () => {
    it('should return a seller by id', async () => {
      const sellerId = 1;
      const seller: SellerEntity = {
        date: new Date(),
        value: 100.0,
        name: 'Seller 1',
        id: 1,
      };
      jest.spyOn(sellersService, 'findById').mockResolvedValueOnce(seller);

      const result = await controller.findOne(sellerId);
      expect(result).toEqual(seller);
    });

    it('should throw NotFoundException when a seller by id is not found', async () => {
      const sellerId = 1;
      jest.spyOn(sellersService, 'findById').mockResolvedValueOnce(null);

      try {
        await controller.findOne(sellerId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('findBySeller', () => {
    it('should return a seller by name', async () => {
      const sellerName = 'Seller 1';
      const seller: SellerEntity = {
        date: new Date(),
        value: 100.0,
        name: 'Seller 1',
        id: 1,
      };
      jest.spyOn(sellersService, 'findByName').mockResolvedValueOnce([seller]);

      const result = await controller.findBySeller({ name: sellerName });
      expect(result).toEqual(seller);
    });

    it('should throw NotFoundException when a seller by name is not found', async () => {
      const sellerName = 'Nonexistent Seller';
      jest.spyOn(sellersService, 'findByName').mockResolvedValueOnce([]);

      try {
        await controller.findBySeller({ name: sellerName });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a seller by id', async () => {
      const sellerId = 1;
      const updatedSeller: SellerEntity = {
        date: new Date(),
        value: 200.0,
        name: 'Updated Seller',
        id: 1,
      };
      jest.spyOn(sellersService, 'update').mockResolvedValueOnce(undefined);

      const result = await controller.update(sellerId, updatedSeller);
      expect(result).toBeUndefined();
      expect(sellersService.update).toHaveBeenCalledWith(
        sellerId,
        updatedSeller,
      );
    });

    it('should throw NotFoundException when updating a non-existing seller', async () => {
      const sellerId = 1;
      const updatedSeller: SellerEntity = {
        date: new Date(),
        value: 200.0,
        name: 'Updated Seller',
        id: 1,
      };
      jest
        .spyOn(sellersService, 'update')
        .mockRejectedValueOnce(new NotFoundException());

      try {
        await controller.update(sellerId, updatedSeller);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should delete a seller by id', async () => {
      const sellerId = 1;
      const seller: SellerEntity = {
        date: new Date(),
        value: 100.0,
        name: 'Seller 1',
        id: 1,
      };
      jest.spyOn(sellersService, 'findById').mockResolvedValueOnce(seller);
      jest.spyOn(sellersService, 'delete').mockResolvedValueOnce(undefined);

      const result = await controller.delete(sellerId);
      expect(result).toBeUndefined();
      expect(sellersService.delete).toHaveBeenCalledWith(sellerId);
    });

    it('should throw NotFoundException when deleting a non-existing seller', async () => {
      const sellerId = 1;
      jest.spyOn(sellersService, 'findById').mockResolvedValueOnce(null);

      try {
        await controller.delete(sellerId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
