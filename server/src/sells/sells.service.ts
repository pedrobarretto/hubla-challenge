import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SellsService {
  constructor(
    @InjectRepository(SellEntity)
    private sellsRespository: Repository<SellEntity>,
  ) {}

  async findAll(): Promise<SellEntity[]> {
    return this.sellsRespository.find();
  }

  async findOne(id: number): Promise<SellEntity | null> {
    return this.sellsRespository.findOne({ where: { id } });
  }

  async create(user: Partial<SellEntity>): Promise<SellEntity> {
    const newuser = this.sellsRespository.create(user);
    return this.sellsRespository.save(newuser);
  }

  async update(
    id: number,
    user: Partial<SellEntity>,
  ): Promise<SellEntity | null> {
    await this.sellsRespository.update(id, user);
    return this.sellsRespository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.sellsRespository.delete(id);
  }
}
