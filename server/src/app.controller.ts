import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { Sell } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { hello: string } {
    return this.appService.getHello();
  }

  // @Post('/upload')
  // async uploadSellData(@Body() sellData: { sell: Sell[] }) {
  //   await this.appService.uploadFile(sellData.sell);
  //   return { message: 'Dados de venda foram salvos com sucesso' };
  // }
}
