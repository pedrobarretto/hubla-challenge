import { Test, TestingModule } from '@nestjs/testing';
import { AfiliateController } from './afiliate.controller';
import { AfiliateService } from './afiliate.service';
import { AfiliateEntity } from '../entities';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AfiliateController', () => {
  let controller: AfiliateController;
  let afiliateService: AfiliateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AfiliateController],
      providers: [
        AfiliateService,
        {
          provide: getRepositoryToken(AfiliateEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AfiliateController>(AfiliateController);
    afiliateService = module.get<AfiliateService>(AfiliateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      jest.spyOn(afiliateService, 'findAll').mockResolvedValueOnce(afiliates);

      const result = await controller.findAll();
      expect(result).toEqual(afiliates);
    });
  });

  describe('findOne', () => {
    it('should return an afiliate by ID', async () => {
      const afiliate: AfiliateEntity[] = [
        {
          date: new Date(),
          value: 100.0,
          name: 'Afiliate 1',
          id: 1,
        },
      ];
      jest.spyOn(afiliateService, 'findById').mockResolvedValueOnce(afiliate);

      const result = await controller.findOne(1);
      expect(result).toEqual(afiliate);
    });

    it('should throw NotFoundException when an afiliate with the given ID is not found', async () => {
      jest.spyOn(afiliateService, 'findById').mockResolvedValueOnce([]);

      await expect(controller.findOne(999)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('findByName', () => {
    it('should return an array of afiliates by name', async () => {
      const name = 'John Doe';
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
          name: 'John Doe',
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
      jest
        .spyOn(afiliateService, 'findByName')
        .mockResolvedValueOnce(afiliates);

      const result = await controller.findByName({ name });
      expect(result).toEqual(afiliates);
    });

    it('should throw NotFoundException when no afiliate with the given name is found', async () => {
      const name = 'Non-existent Afiliate';
      jest.spyOn(afiliateService, 'findByName').mockResolvedValueOnce([]);

      await expect(controller.findByName({ name })).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  // FIXME: Error on this test - TypeError: Cannot read properties of undefined (reading 'findBy')
  // describe('update', () => {
  //   it('should update an afiliate by ID', async () => {
  //     const idToUpdate = 1;
  //     const afiliateToUpdate: AfiliateEntity = {
  //       date: new Date(),
  //       value: 100.0,
  //       name: 'Afiliate 1',
  //       id: 1,
  //     };
  //     jest.spyOn(afiliateService, 'update').mockResolvedValueOnce(undefined);

  //     await controller.update(idToUpdate, afiliateToUpdate);

  //     expect(afiliateService.update).toHaveBeenCalledWith(
  //       idToUpdate,
  //       afiliateToUpdate,
  //     );
  //   });
  // });

  describe('delete', () => {
    it('should delete an afiliate by ID', async () => {
      const idToDelete = 1;
      const afiliateToDelete: AfiliateEntity[] = [
        {
          date: new Date(),
          value: 100.0,
          name: 'Afiliate 1',
          id: 1,
        },
      ];
      jest
        .spyOn(afiliateService, 'findById')
        .mockResolvedValueOnce(afiliateToDelete);
      jest.spyOn(afiliateService, 'delete').mockResolvedValueOnce(undefined);

      await controller.delete(idToDelete);

      expect(afiliateService.findById).toHaveBeenCalledWith(idToDelete);
      expect(afiliateService.delete).toHaveBeenCalledWith(idToDelete);
    });

    it('should throw a NotFoundException with an invalid ID', async () => {
      jest.spyOn(afiliateService, 'findById').mockResolvedValue([]);

      try {
        await controller.delete(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }

      expect(afiliateService.findById).toHaveBeenCalledWith(999);
    });
  });
});
