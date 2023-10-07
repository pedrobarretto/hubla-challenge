export interface Sell {
  type: number;
  date: string;
  product: string;
  value: number;
  seller: string;
}

export enum SellType {
  productorSell,
  afiliateSell,
  comissionPaid,
  comissionReceived,
}
