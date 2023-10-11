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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('afiliates')
@Controller('afiliates')
export class AfiliateController {
  constructor(private readonly afiliatesService: AfiliateService) {}

  @ApiOperation({ summary: 'Get all afiliates' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of afiliates entities',
    type: [AfiliateEntity],
  })
  @Get()
  async findAll(): Promise<AfiliateEntity[]> {
    return this.afiliatesService.findAll();
  }

  @ApiOperation({ summary: 'Get a afiliate by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns an afiliates entities by id',
    type: AfiliateEntity,
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AfiliateEntity[]> {
    const afiliate = await this.afiliatesService.findById(id);
    if (afiliate.length === 0)
      throw new NotFoundException('Afiliate not found');

    return afiliate;
  }

  @ApiOperation({ summary: 'Get a afiliate by name' })
  @ApiResponse({
    status: 201,
    description: 'Returns a afiliate entitie by name',
    type: AfiliateEntity,
  })
  @Post()
  async findByName(@Body() dto: { name: string }): Promise<AfiliateEntity[]> {
    const afiliate = await this.afiliatesService.findByName(dto.name);
    if (afiliate.length === 0)
      throw new NotFoundException('Afiliate not found');

    return afiliate;
  }

  @ApiOperation({ summary: 'Update a afiliate by id' })
  @ApiResponse({
    status: 200,
    description:
      'Update a afiliate entity with the id that you passed via params, and the content of seller in the body',
    type: AfiliateEntity,
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() afiliate: Partial<AfiliateEntity>,
  ): Promise<void> {
    const afiliateById = await this.afiliatesService.findById(id);
    if (!afiliateById) throw new NotFoundException('Afiliate not found');

    await this.afiliatesService.update(id, afiliate);
  }

  @ApiOperation({ summary: 'Delete a afiliate by id' })
  @ApiResponse({
    status: 200,
    description:
      'Delete a afiliate entity with the id that you passed via params',
    type: AfiliateEntity,
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const afiliate = await this.afiliatesService.findById(id);
    if (afiliate.length === 0)
      throw new NotFoundException('Afiliate not found');

    await this.afiliatesService.delete(id);
  }
}
