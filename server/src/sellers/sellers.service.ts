import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellEntity, SellerEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(SellerEntity)
    private sellerReposiry: Repository<SellerEntity>,
  ) {}

  async findAll(): Promise<SellerEntity[]> {
    return this.sellerReposiry.find();
  }

  async findById(id: number): Promise<SellerEntity | null> {
    return this.sellerReposiry.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<SellerEntity[]> {
    return this.sellerReposiry.findBy({ name });
  }

  async create(sellsList: Partial<SellEntity[]>): Promise<SellerEntity> {
    const newSeller = this.sellerReposiry.create(
      this.parseSellsForSeller(sellsList),
    );
    const createdSeller = await this.sellerReposiry.save(newSeller);

    return createdSeller;
  }

  async delete(id: number): Promise<void> {
    await this.sellerReposiry.delete(id);
  }

  private parseSellsForSeller(
    sellsList: Partial<SellEntity[]>,
  ): Partial<SellerEntity> {
    const seller: Partial<SellerEntity> = {
      date: new Date(),
      name: '',
      value: 0,
    };

    sellsList.forEach((sell) => {
      seller.name = sell?.seller;
    });

    return seller;
  }
}
