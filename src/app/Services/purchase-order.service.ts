import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { VendorDesc } from '../Models View/VendorDesc';
import { AnalaticCodeDesc } from '../Models View/AnalaticCodeDesc';
import { CurrencyDesc } from '../Models View/CurrencyDesc';
import { BookDesc } from '../Models View/BookDesc';
import { HtmlParser } from '@angular/compiler';
import { PurchaseOrder } from '../Models View/PurchaseOrder';
import { ItemCard } from '../Models View/ItemCard';
import { PurchaseOrderDetailCreate } from '../Models View/PurchaseOrderDetailCreate';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(
    private httpsService: HttpService
  ) { }

  // Get Methods
  getAllVendors(): Observable<VendorDesc[]>{
    return this.httpsService.get<VendorDesc[]>(`PurchaseOrder/VendorsNames`);
  }

  getAllAnalaticCodes(): Observable<AnalaticCodeDesc[]>{
    return this.httpsService.get<AnalaticCodeDesc[]>(`PurchaseOrder/AnalaticCodes`);
  }

  getAllCurrencies(): Observable<CurrencyDesc[]>{
    return this.httpsService.get<CurrencyDesc[]>(`PurchaseOrder/Currencies`);
  }

  getAllBooksWithTermType18(): Observable<BookDesc[]> {
    return this.httpsService.get<BookDesc[]>(`PurchaseOrder/BooksWithTermType18`);
  }

  getLastPurchaseOrder(): Observable<PurchaseOrder>{
    return this.httpsService.get<PurchaseOrder>(`PurchaseOrder/LastPurchaseOrder`);
  }

  getAllItems(): Observable<ItemCard[]> {
    return this.httpsService.get<ItemCard[]>(`PurchaseOrder/Items`);
  }
  getPurchaseOrderDetails(purchaseOrderId: number): Observable<PurchaseOrderDetailCreate[]>{
    return this.httpsService.get<PurchaseOrderDetailCreate[]>(`PurchaseOrder/GetPurchaseOrderDetailListByPurOrderId/${purchaseOrderId}`)
  }

  // Post Methods
  createPurchaseOrder(purchaseOrderData: PurchaseOrder): Observable<void>{
    return this.httpsService.post<void>(`PurchaseOrder/CreatePurchaseOrder`, purchaseOrderData);
  }
  createPurchaseOrderDetail(purchaseOrderDetailData: PurchaseOrderDetailCreate[]): Observable<void>{
    return this.httpsService.post<void>(`PurchaseOrder/CreatePurchaseOrderDetails`, purchaseOrderDetailData);
  }
}
