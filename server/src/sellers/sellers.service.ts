import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleEntity, SellerEntity } from '../entities';
import { SaleType, Seller } from '../interfaces';
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

  async create(salesList: Partial<SaleEntity[]>): Promise<SellerEntity[]> {
    const seller = this.parseSalesForSeller(salesList);
    const sellersArray: SellerEntity[] = [];

    for (const person of seller) {
      const existingSeller = await this.sellerReposiry.findOne({
        where: { name: person.name },
      });

      if (existingSeller) {
        const list = salesList.filter(
          (sale) => sale?.seller === existingSeller.name,
        );

        let newValue = parseFloat(String(existingSeller.value));
        list.forEach((sale) => {
          if (
            sale?.type === SaleType.productorSale ||
            sale?.type === SaleType.comissionReceived
          ) {
            newValue += parseFloat(String(sale?.value));
          } else if (sale?.type === SaleType.comissionPaid) {
            newValue -= parseFloat(String(sale?.value));
          }
        });

        existingSeller.value = newValue;

        await this.sellerReposiry.update(existingSeller.id, existingSeller);
        sellersArray.push(existingSeller);
      } else {
        const newSeller = this.sellerReposiry.create(person);
        const createdSeller = await this.sellerReposiry.save(newSeller);
        sellersArray.push(createdSeller);
      }
    }

    return sellersArray;
  }

  async update(id: number, seller: Partial<SellerEntity>): Promise<void> {
    await this.sellerReposiry.update(id, seller);
  }

  async delete(id: number): Promise<void> {
    await this.sellerReposiry.delete(id);
  }

  private parseSalesForSeller(salesList: Partial<SaleEntity[]>): Seller[] {
    const sellerMap = new Map<string, Seller>();

    salesList.forEach((sale) => {
      if (sale) {
        const name = sale.seller;
        let sellerToUpdate = sellerMap.get(name);

        if (!sellerToUpdate) {
          sellerToUpdate = {
            name: name,
            date: sale.date,
            value: 0,
          };

          sellerMap.set(name, sellerToUpdate);
        }

        if (
          sale.type === SaleType.productorSale ||
          sale.type === SaleType.comissionReceived
        ) {
          sellerToUpdate.value += sale.value;
        } else if (sale.type === SaleType.comissionPaid) {
          sellerToUpdate.value -= sale.value;
        }
      }
    });

    const sellerList = Array.from(sellerMap.values());

    return sellerList;
  }
}
