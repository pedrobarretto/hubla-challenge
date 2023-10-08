import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AfiliateEntity, SellEntity } from '../entities';
import { Afiliate } from 'src/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class AfiliateService {
  constructor(
    @InjectRepository(AfiliateEntity)
    private afiliateRepository: Repository<AfiliateEntity>,
  ) {}

  async findAll(): Promise<AfiliateEntity[]> {
    return this.afiliateRepository.find();
  }

  async findById(id: number): Promise<AfiliateEntity | null> {
    return this.afiliateRepository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<AfiliateEntity[]> {
    return this.afiliateRepository.findBy({ name });
  }

  async delete(id: number): Promise<void> {
    await this.afiliateRepository.delete(id);
  }

  async update(id: number, afiliate: Partial<AfiliateEntity>): Promise<void> {
    await this.afiliateRepository.update(id, afiliate);
  }

  async create(sellsList: Partial<SellEntity[]>): Promise<AfiliateEntity[]> {
    const afiliate = this.parseSellsForAfiliates(sellsList);
    const afiliatesArray: AfiliateEntity[] = [];

    for (const person of afiliate) {
      const existingAfiliate = await this.afiliateRepository.findOne({
        where: { name: person.name },
      });

      if (existingAfiliate) {
        const list = sellsList.filter(
          (sell) => sell?.seller === existingAfiliate.name,
        );

        let newValue = parseFloat(String(existingAfiliate.value));
        list.forEach((sell) => {
          newValue += parseFloat(String(sell?.value));
        });

        existingAfiliate.value = newValue;

        await this.afiliateRepository.update(
          existingAfiliate.id,
          existingAfiliate,
        );
        afiliatesArray.push(existingAfiliate);
      } else {
        const newAfiliate = this.afiliateRepository.create(person);
        const createdAfiliate = await this.afiliateRepository.save(newAfiliate);
        afiliatesArray.push(createdAfiliate);
      }
    }

    return afiliatesArray;
  }

  private parseSellsForAfiliates(sellsList: Partial<SellEntity[]>): Afiliate[] {
    const afiliateMap = new Map<string, Afiliate>();

    sellsList.forEach((sell) => {
      if (sell) {
        const name = sell.seller;
        let sellerToUpdate = afiliateMap.get(name);

        if (!sellerToUpdate) {
          sellerToUpdate = {
            name: name,
            date: sell.date,
            value: 0,
          };

          afiliateMap.set(name, sellerToUpdate);
        }

        sellerToUpdate.value += sell.value;
      }
    });

    const afiliateList = Array.from(afiliateMap.values());

    return afiliateList;
  }
}
