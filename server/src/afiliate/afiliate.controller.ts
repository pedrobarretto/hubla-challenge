import {
  Controller,
  NotFoundException,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AfiliateService } from './afiliate.service';
import { AfiliateEntity } from '../entities';

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
    const afiliate = await this.afiliatesService.findByName(dto.name);
    if (afiliate.length === 0)
      throw new NotFoundException('Afiliate not found');

    return afiliate;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() afiliate: Partial<AfiliateEntity>,
  ): Promise<void> {
    const afiliateById = await this.afiliatesService.findById(id);
    if (!afiliateById) throw new NotFoundException('Afiliate not found');

    await this.afiliatesService.update(id, afiliate);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const afiliate = await this.afiliatesService.findById(id);
    if (!afiliate) throw new NotFoundException('Afiliate not found');

    await this.afiliatesService.delete(id);
  }
}
