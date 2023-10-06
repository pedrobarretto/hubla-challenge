export interface Sell {
  data: string;
  product: string;
  seller: string;
  type: TransactionType;
  value: number;
}

export enum TransactionType {
  productorSell,
  afiliateSell,
  comissionPaid,
  comissionReceived,
}
