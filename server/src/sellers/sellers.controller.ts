import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellerEntity } from '../entities';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('sellers')
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @ApiOperation({ summary: 'Get all sellers' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of sellers entities',
    type: [SellerEntity],
  })
  @Get()
  async findAll(): Promise<SellerEntity[]> {
    return this.sellersService.findAll();
  }

  @ApiOperation({ summary: 'Get a seller by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns an sellers entities by id',
    type: SellerEntity,
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<SellerEntity> {
    const seller = await this.sellersService.findById(id);
    if (!seller) throw new NotFoundException('Seller not found');

    return seller;
  }

  @ApiOperation({ summary: 'Get a seller by name' })
  @ApiResponse({
    status: 201,
    description: 'Returns a seller entitie by name',
    type: SellerEntity,
  })
  @Post()
  async findBySeller(@Body() dto: { name: string }): Promise<SellerEntity> {
    const seller = await this.sellersService.findByName(dto.name);
    if (seller.length === 0) throw new NotFoundException('Seller not found');

    return seller[0];
  }

  @ApiOperation({ summary: 'Update a seller by id' })
  @ApiResponse({
    status: 200,
    description:
      'Update a seller entity with the id that you passed via params, and the content of seller in the body',
    type: SellerEntity,
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() seller: SellerEntity,
  ): Promise<void> {
    await this.sellersService.update(id, seller);
  }

  @ApiOperation({ summary: 'Delete a seller by id' })
  @ApiResponse({
    status: 200,
    description:
      'Delete a seller entity with the id that you passed via params',
    type: SellerEntity,
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const seller = await this.sellersService.findById(id);
    if (!seller) throw new NotFoundException('Seller not found');

    await this.sellersService.delete(id);
  }
}
