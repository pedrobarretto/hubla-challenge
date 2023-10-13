export interface Sale {
  type: number;
  date: string;
  product: string;
  value: number;
  seller: string;
  id: number;
}

export enum SaleType {
  productorSale = 1,
  afiliateSale = 2,
  comissionPaid = 3,
  comissionReceived = 4,
}