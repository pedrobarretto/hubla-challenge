import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SellsService } from './sells.service';
import { SellEntity } from 'src/entities';
import { SellersService } from 'src/sellers/sellers.service';

@Controller('sells')
export class SellsController {
  constructor(
    private readonly sellsService: SellsService,
    private readonly sellersService: SellersService,
  ) {}

  @Get()
  async findAll(): Promise<SellEntity[]> {
    return this.sellsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SellEntity> {
    const sell = await this.sellsService.findById(id);
    if (!sell) throw new NotFoundException('Sell not found');

    return sell;
  }

  @Post('/seller')
  async findBySeller(@Body() dto: { seller: string }): Promise<SellEntity[]> {
    const sell = await this.sellsService.findBySeller(dto.seller);
    if (!sell) throw new NotFoundException('Seller not found');

    return sell;
  }

  @Post()
  async create(@Body() dto: { sell: string }): Promise<SellEntity[]> {
    return this.sellsService.create(dto.sell);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() sell: SellEntity,
  ): Promise<void> {
    await this.sellsService.update(id, sell);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const sell = await this.sellsService.findById(id);
    if (!sell) throw new NotFoundException('Sell not found');

    await this.sellsService.delete(id);
  }
}
