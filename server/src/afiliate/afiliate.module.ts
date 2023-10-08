import { Module } from '@nestjs/common';
import { AfiliateService } from './afiliate.service';
import { AfiliateController } from './afiliate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfiliateEntity } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([AfiliateEntity])],
  providers: [AfiliateService],
  controllers: [AfiliateController],
  exports: [AfiliateService],
})
export class AfiliateModule {}
