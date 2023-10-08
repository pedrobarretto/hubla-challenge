export interface Sell {
  type: number;
  date: string;
  product: string;
  value: number;
  seller: string;
}

export enum SellType {
  productorSell = 1,
  afiliateSell = 2,
  comissionPaid = 3,
  comissionReceived = 4,
}
