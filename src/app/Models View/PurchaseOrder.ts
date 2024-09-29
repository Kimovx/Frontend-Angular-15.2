export interface PurchaseOrder {
  purOrderId?: number;
  bookId?: number;
  aId: number;
  termType: number;
  trDate: Date;
  arrivalDate: Date;
  expiryDate?: Date;
  deliveryPeriodDays: number;
  payPeriodDays: number;
  manualTrNo: string;
  invoiceType: number;
  rate?: number;
  vendorId: number;
  currencyId: number;
}
