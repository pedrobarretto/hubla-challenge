import { SaleType } from '../interfaces';

export function handleSaleType(type: number): string {
  switch (type) {
    case SaleType.afiliateSale:
      return 'Venda de afiliado';
    case SaleType.comissionPaid:
      return 'Comissão paga';
    case SaleType.comissionReceived:
      return 'Comisão recebida';
    case SaleType.productorSale:
      return 'Venda do produtor';
    default:
      return 'Venda realizada'
  }
}