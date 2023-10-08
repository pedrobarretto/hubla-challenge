import {
  Controller,
  NotFoundException,
  Post,
  Get,
  Param,
  Body,
} from '@nestjs/common';
import { AfiliateService } from './afiliate.service';
import { AfiliateEntity } from 'src/entities';

@Controller('afiliate')
export class AfiliateController {
  constructor(private readonly afiliatesService: AfiliateService) {}

  @Get()
  async findAll(): Promise<AfiliateEntity[]> {
    return this.afiliatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AfiliateEntity> {
    const afiliate = await this.afiliatesService.findById(id);
    if (!afiliate) throw new NotFoundException('Afiliate not found');

    return afiliate;
  }

  @Post()
  async findByName(@Body() dto: { name: string }): Promise<AfiliateEntity[]> {
    const sell = await this.afiliatesService.findByName(dto.name);
    if (!sell) throw new NotFoundException('Afiliate not found');

    return sell;
  }
}
