import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { VendorDesc } from '../Models View/VendorDesc';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private httpService: HttpService
  ) { }

  searchVendorByName(vendorName: string): Observable<VendorDesc[]> {
    return this.httpService.get<VendorDesc[]>(`Search/SearchVendorByName/${vendorName}`);
  }

  searchVendorByCode(vendorCode: string): Observable<VendorDesc[]> {
    return this.httpService.get<VendorDesc[]>(`Search/SearchVendorByCode/${vendorCode}`);
  }

}
