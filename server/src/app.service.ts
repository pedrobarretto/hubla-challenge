import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { SellEntity } from './entities';
// import { Sell } from './interfaces';

@Injectable()
export class AppService {
  // constructor(
  //   // @InjectRepository(SellEntity)
  //   // private readonly sellRepository: Repository<SellEntity>,
  // ) {}

  getHello(): { hello: string } {
    return { hello: 'Hello World!' };
  }

  // async uploadFile(sells: Sell[]): Promise<void> {
  //   // Mapeie os dados do array `sells` para a entidade `SellEntity`
  //   const entitiesToInsert = sells.map((sell) =>
  //     this.sellRepository.create(sell),
  //   );

  //   // Salve os dados no banco de dados
  //   await this.sellRepository.save(entitiesToInsert);
  // }
}
