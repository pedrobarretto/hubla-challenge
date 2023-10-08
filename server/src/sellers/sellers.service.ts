import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SellEntity, SellerEntity } from 'src/entities';
import { SellType, Seller } from 'src/interfaces';
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

  async create(sellsList: Partial<SellEntity[]>): Promise<SellerEntity[]> {
    const seller = this.parseSellsForSeller(sellsList);
    const sellersArray: SellerEntity[] = [];

    for (const person of seller) {
      const existingSeller = await this.sellerReposiry.findOne({
        where: { name: person.name },
      });

      if (existingSeller) {
        const list = sellsList.filter(
          (sell) => sell?.seller === existingSeller.name,
        );

        let newValue = parseFloat(String(existingSeller.value));
        list.forEach((sell) => {
          if (
            sell?.type === SellType.productorSell ||
            sell?.type === SellType.comissionReceived
          ) {
            newValue += parseFloat(String(sell?.value));
          } else if (sell?.type === SellType.comissionPaid) {
            newValue -= parseFloat(String(sell?.value));
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

  async delete(id: number): Promise<void> {
    await this.sellerReposiry.delete(id);
  }

  private parseSellsForSeller(sellsList: Partial<SellEntity[]>): Seller[] {
    const sellerMap = new Map<string, Seller>();

    sellsList.forEach((sell) => {
      if (sell) {
        const name = sell.seller;
        let sellerToUpdate = sellerMap.get(name);

        if (!sellerToUpdate) {
          sellerToUpdate = {
            name: name,
            date: sell.date,
            value: 0,
          };

          sellerMap.set(name, sellerToUpdate);
        }

        if (
          sell.type === SellType.productorSell ||
          sell.type === SellType.comissionReceived
        ) {
          sellerToUpdate.value += sell.value;
        } else if (sell.type === SellType.comissionPaid) {
          sellerToUpdate.value -= sell.value;
        }
      }
    });

    const sellerList = Array.from(sellerMap.values());

    return sellerList;
  }
}
