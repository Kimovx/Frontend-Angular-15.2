import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { VendorDesc } from 'src/app/Models View/VendorDesc';
import { SearchService } from 'src/app/Services/search.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent {

  displayedColumns = [
    '#',
    'vendorDescA',
    'vendorCode',
    'selectBtn',
  ]

  dataSource: VendorDesc[] = [];

  isSearching: boolean;

  selectedVendorId?: number;

  constructor(
    private toastr: ToastrService,
    private searchService: SearchService,
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.isSearching = false;
  }

  async searchByName(vendorName: string){
    if(vendorName !== ''){
      this.isSearching = true;
      try {
        this.dataSource = await firstValueFrom(this.searchService.searchVendorByName(vendorName))
        this.isSearching = false;
      }
      catch {
        this.toastr.error('حدث خطأ غير معروف, الرجاء المحاوله مجدداً', 'خطأ');
        this.isSearching = false;
        return;
      }
    }
    else {
      return;
    }
  }

  async searchByCode(vendorCode: string){
    if(vendorCode !== ''){
      this.isSearching = true;
      try {
        this.dataSource = await firstValueFrom(this.searchService.searchVendorByCode(vendorCode));
        this.isSearching = false;
      }
      catch {
        this.toastr.error('حدث خطأ غير معروف, الرجاء المحاوله مجدداً', 'خطأ');
        this.isSearching = false;
      }
    }
    else {
      return;
    }
  }

  close(selectedVendor: VendorDesc){
    this.dialogRef.close(selectedVendor);
  }

}
