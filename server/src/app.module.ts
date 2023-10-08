import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SalesModule } from './sales/sales.module';
import { SellersModule } from './sellers/sellers.module';
import { SalesController } from './sales/sales.controller';
import { SellersController } from './sellers/sellers.controller';
import { SalesService } from './sales/sales.service';
import { SellersService } from './sellers/sellers.service';
import { AfiliateEntity, SaleEntity, SellerEntity } from './entities';
import { AfiliateModule } from './afiliate/afiliate.module';
import { AfiliateService } from './afiliate/afiliate.service';
import { AfiliateController } from './afiliate/afiliate.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SalesModule,
    SellersModule,
    AfiliateModule,
    TypeOrmModule.forFeature([SellerEntity, SaleEntity, AfiliateEntity]),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT as string),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AfiliateModule,
  ],
  controllers: [
    AppController,
    SalesController,
    SellersController,
    AfiliateController,
  ],
  providers: [AppService, SalesService, SellersService, AfiliateService],
  exports: [SalesService, SellersService, AfiliateService],
})
export class AppModule {}
