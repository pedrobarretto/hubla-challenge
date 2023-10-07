import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellEntity } from 'src/entities';
import { Sell, SellType } from 'src/interfaces';
import { SellersService } from 'src/sellers/sellers.service';
import { Repository } from 'typeorm';

@Injectable()
export class SellsService {
  constructor(
    @InjectRepository(SellEntity)
    private sellsRespository: Repository<SellEntity>,
    private sellerService: SellersService,
  ) {}

  async findAll(): Promise<SellEntity[]> {
    return this.sellsRespository.find();
  }

  async findById(id: number): Promise<SellEntity | null> {
    return this.sellsRespository.findOne({ where: { id } });
  }

  async findBySeller(seller: string): Promise<SellEntity[]> {
    return this.sellsRespository.findBy({ seller });
  }

  async create(sells: string): Promise<SellEntity[]> {
    const parsedSells: Sell[] = this.parseFile(sells);

    if (parsedSells.length === 0) {
      throw new Error('Empty sells file');
    }

    const sellsArray: SellEntity[] = [];
    const sellersSells: Sell[] = parsedSells
      .filter(
        (sell) =>
          sell &&
          (sell.type === SellType.productorSell ||
            sell.type === SellType.comissionPaid ||
            sell.type === SellType.comissionReceived),
      )
      .map((sell) => {
        if (sell) {
          return {
            type: sell.type,
            date: new Date(sell.date),
            product: sell.product,
            value: sell.value,
            seller: sell.seller,
          };
        }
      });

    parsedSells.forEach(async (sell) => {
      if (!sell) return;

      const newSell = this.sellsRespository.create(sell);
      const createdSell = await this.sellsRespository.save(newSell);
      sellsArray.push(createdSell);
    });

    this.sellerService.create(sellersSells);

    return sellsArray;
  }

  async update(
    id: number,
    sell: Partial<SellEntity>,
  ): Promise<SellEntity | null> {
    await this.sellsRespository.update(id, sell);
    return this.sellsRespository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.sellsRespository.delete(id);
  }

  private parseFile(fileContent: string | ArrayBuffer): Sell[] {
    console.log(fileContent);

    const lines = (
      typeof fileContent === 'string'
        ? fileContent
        : Buffer.from(fileContent).toString('utf-8')
    ).split('\n');

    const transactions: Sell[] = [];

    lines.forEach((line: string) => {
      if (line.trim() === '') return;

      const type = parseInt(line.substring(0, 1));
      const date = line.substring(1, 26);
      const product = line.substring(26, 56).trim();
      const value = parseInt(line.substring(56, 66));
      const seller = line.substring(66, 86).trim();

      if (
        type !== undefined &&
        date &&
        product &&
        value !== undefined &&
        seller
      ) {
        transactions.push({
          type,
          date: String(new Date(date)),
          product,
          value: value / 100,
          seller,
        });
      }
    });

    return transactions;
  }
}
