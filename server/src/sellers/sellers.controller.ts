import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellerEntity } from 'src/entities';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Get()
  async findAll(): Promise<SellerEntity[]> {
    return this.sellersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SellerEntity> {
    const seller = await this.sellersService.findById(id);
    if (!seller) throw new NotFoundException('Seller not found');

    return seller;
  }

  @Post()
  async findBySeller(@Body() dto: { name: string }): Promise<SellerEntity[]> {
    const sell = await this.sellersService.findByName(dto.name);
    if (!sell) throw new NotFoundException('Seller not found');

    return sell;
  }
}
