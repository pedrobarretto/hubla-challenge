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

@Controller('sells')
export class SellsController {
  constructor(private readonly sellsService: SellsService) {}

  @Get()
  async findAll(): Promise<SellEntity[]> {
    return this.sellsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SellEntity> {
    const sell = await this.sellsService.findOne(id);
    if (!sell) throw new NotFoundException('User not found');

    return sell;
  }

  @Post()
  async create(@Body() sell: SellEntity): Promise<SellEntity> {
    return this.sellsService.create(sell);
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
    const sell = await this.sellsService.findOne(id);
    if (!sell) throw new NotFoundException('User not found');

    await this.sellsService.delete(id);
  }
}
