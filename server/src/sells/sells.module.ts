import { Module } from '@nestjs/common';
import { SellsController } from './sells.controller';
import { SellsService } from './sells.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfiliateEntity, SellEntity, SellerEntity } from '../entities';
import { SellersService } from 'src/sellers/sellers.service';
import { AfiliateService } from 'src/afiliate/afiliate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellEntity, SellerEntity, AfiliateEntity]),
  ],
  controllers: [SellsController],
  providers: [SellsService, SellersService, AfiliateService],
})
export class SellsModule {}
