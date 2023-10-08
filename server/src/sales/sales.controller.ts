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
import { SalesService } from './sales.service';
import { SaleEntity } from '../entities';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @ApiOperation({ summary: 'Get all sales' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of sale entities',
    type: [SaleEntity],
  })
  @Get()
  async findAll(): Promise<SaleEntity[]> {
    return this.salesService.findAll();
  }

  @ApiOperation({ summary: 'Get a sale by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns a sale entity with the id that you passed via params',
    type: SaleEntity,
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SaleEntity> {
    const sale = await this.salesService.findById(id);
    if (!sale) throw new NotFoundException('Sale not found');

    return sale;
  }

  @ApiOperation({ summary: 'Get all sales made by a seller' })
  @ApiResponse({
    status: 201,
    description: 'Returns an array of sales of a seller',
    type: [SaleEntity],
  })
  @Post('/seller')
  async findBySeller(@Body() dto: { seller: string }): Promise<SaleEntity[]> {
    const sale = await this.salesService.findBySeller(dto.seller);
    if (!sale) throw new NotFoundException('Sale not found');

    return sale;
  }

  @ApiOperation({ summary: 'Create sales on database based on .txt upload' })
  @ApiResponse({
    status: 201,
    description:
      'Returns an array of sale entities that have been created by file upload',
    type: [SaleEntity],
  })
  @Post()
  async create(@Body() dto: { sale: string }): Promise<SaleEntity[]> {
    return this.salesService.create(dto.sale);
  }

  @ApiOperation({ summary: 'Update a sale by id' })
  @ApiResponse({
    status: 200,
    description:
      'Update a sale entity with the id that you passed via params, and the content of sale in the body',
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() sale: SaleEntity,
  ): Promise<void> {
    const sellById = await this.salesService.findById(id);
    if (!sellById) throw new NotFoundException('Seller not found');

    await this.salesService.update(id, sale);
  }

  @ApiOperation({ summary: 'Delete a sale by id' })
  @ApiResponse({
    status: 200,
    description: 'Delete a sale entity with the id that you passed via params',
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const sale = await this.salesService.findById(id);
    if (!sale) throw new NotFoundException('Sale not found');

    await this.salesService.delete(id);
  }
}
