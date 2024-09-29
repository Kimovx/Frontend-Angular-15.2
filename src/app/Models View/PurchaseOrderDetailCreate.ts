export interface PurchaseOrderDetailCreate {
  purOrderId: number,
  itemCardId: number,
  storeId?: number,
  unitId?: number,
  quantity: number,
  price: number,
  itemCardDesc: string
}
