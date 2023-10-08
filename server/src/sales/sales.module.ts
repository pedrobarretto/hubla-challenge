import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfiliateEntity, SaleEntity, SellerEntity } from '../entities';
import { SellersService } from 'src/sellers/sellers.service';
import { AfiliateService } from 'src/afiliate/afiliate.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleEntity, SellerEntity, AfiliateEntity]),
  ],
  controllers: [SalesController],
  providers: [SalesService, SellersService, AfiliateService],
})
export class SalesModule {}
