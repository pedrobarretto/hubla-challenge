import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AfiliateService } from '../afiliate/afiliate.service';
import { SaleEntity } from '../entities';
import { Sale, SaleType } from '../interfaces';
import { SellersService } from '../sellers/sellers.service';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SaleEntity)
    private salesRespository: Repository<SaleEntity>,
    private sellerService: SellersService,
    private afiliateService: AfiliateService,
  ) {}

  async findAll(): Promise<SaleEntity[]> {
    return this.salesRespository.find();
  }

  async findById(id: number): Promise<SaleEntity | null> {
    return this.salesRespository.findOne({ where: { id } });
  }

  async findBySeller(seller: string): Promise<SaleEntity[]> {
    return this.salesRespository.findBy({ seller });
  }

  async create(sales: string): Promise<SaleEntity[]> {
    const parsedSales: Sale[] = this.parseFile(sales);

    if (parsedSales.length === 0) {
      throw new Error('Empty sales file');
    }

    const salesArray: SaleEntity[] = [];
    const sellersSales: any[] = parsedSales
      .filter(
        (sale) =>
          sale &&
          (sale.type === SaleType.productorSale ||
            sale.type === SaleType.comissionPaid ||
            sale.type === SaleType.comissionReceived),
      )
      .map((sale) => {
        if (sale) {
          return {
            type: sale.type,
            date: String(new Date(sale.date).toISOString()),
            product: sale.product,
            value: sale.value,
            seller: sale.seller,
          };
        }
      });

    const afiliateSales: any[] = parsedSales
      .filter((sale) => sale && sale.type === SaleType.afiliateSale)
      .map((sale) => {
        if (sale) {
          return {
            type: sale.type,
            date: String(new Date(sale.date).toISOString()),
            product: sale.product,
            value: sale.value,
            seller: sale.seller,
          };
        }
      });

    parsedSales.forEach(async (sale) => {
      if (!sale) return;

      const newSell = this.salesRespository.create(sale);
      const createdSell = await this.salesRespository.save(newSell);
      salesArray.push(createdSell);
    });

    await this.sellerService.create(sellersSales);
    await this.afiliateService.create(afiliateSales);

    return salesArray;
  }

  async update(
    id: number,
    sale: Partial<SaleEntity>,
  ): Promise<SaleEntity | null> {
    await this.salesRespository.update(id, sale);
    return this.salesRespository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.salesRespository.delete(id);
  }

  private parseFile(fileContent: string | ArrayBuffer): Sale[] {
    const lines = (
      typeof fileContent === 'string'
        ? fileContent
        : Buffer.from(fileContent).toString('utf-8')
    ).split('\n');

    const transactions: Sale[] = [];

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
          date: String(new Date(date).toISOString()),
          product,
          value: value / 100,
          seller,
        });
      }
    });

    return transactions;
  }
}
