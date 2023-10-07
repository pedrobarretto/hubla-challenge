import { Module } from '@nestjs/common';
import { SellsController } from './sells.controller';
import { SellsService } from './sells.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellEntity } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([SellEntity])],
  controllers: [SellsController],
  providers: [SellsService],
})
export class SellsModule {}
