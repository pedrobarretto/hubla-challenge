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
import { SellEntity } from '../entities';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('sells')
@Controller('sells')
export class SellsController {
  constructor(private readonly sellsService: SellsService) {}

  @ApiOperation({ summary: 'Get all sells' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of sell entities',
    type: [SellEntity],
  })
  @Get()
  async findAll(): Promise<SellEntity[]> {
    return this.sellsService.findAll();
  }

  @ApiOperation({ summary: 'Get a sell by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns a sell entity with the id that you passed via params',
    type: SellEntity,
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SellEntity> {
    const sell = await this.sellsService.findById(id);
    if (!sell) throw new NotFoundException('Sell not found');

    return sell;
  }

  @ApiOperation({ summary: 'Get all sales made by a seller' })
  @ApiResponse({
    status: 201,
    description: 'Returns an array of sales of a seller',
    type: [SellEntity],
  })
  @Post('/seller')
  async findBySeller(@Body() dto: { seller: string }): Promise<SellEntity[]> {
    const sell = await this.sellsService.findBySeller(dto.seller);
    if (!sell) throw new NotFoundException('Sell not found');

    return sell;
  }

  @ApiOperation({ summary: 'Create sells on database based on .txt upload' })
  @ApiResponse({
    status: 201,
    description:
      'Returns an array of sell entities that have been created by file upload',
    type: [SellEntity],
  })
  @Post()
  async create(@Body() dto: { sell: string }): Promise<SellEntity[]> {
    return this.sellsService.create(dto.sell);
  }

  @ApiOperation({ summary: 'Update a sell by id' })
  @ApiResponse({
    status: 200,
    description:
      'Update a sell entity with the id that you passed via params, and the content of sell in the body',
    type: SellEntity,
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() sell: SellEntity,
  ): Promise<void> {
    const sellById = await this.sellsService.findById(id);
    if (!sellById) throw new NotFoundException('Seller not found');

    await this.sellsService.update(id, sell);
  }

  @ApiOperation({ summary: 'Delete a sell by id' })
  @ApiResponse({
    status: 200,
    description: 'Delete a sell entity with the id that you passed via params',
    type: SellEntity,
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const sell = await this.sellsService.findById(id);
    if (!sell) throw new NotFoundException('Sell not found');

    await this.sellsService.delete(id);
  }
}
