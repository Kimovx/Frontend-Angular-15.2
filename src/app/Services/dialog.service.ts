import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from '../Components/Dialogs/search-dialog/search-dialog.component';
import { firstValueFrom } from 'rxjs';
import { VendorDesc } from '../Models View/VendorDesc';


@Injectable({
  providedIn: 'root'
})
export class DialogService {
  readonly dialog = inject(MatDialog);

  selectedVendor?: VendorDesc;

  constructor() { }

  async openSearchDialog() {
    this.selectedVendor = await firstValueFrom(
      this.dialog.open(SearchDialogComponent,
        {
          width: '100%',
          height: '75%',
        }
      ).afterClosed()
    );

    return this.selectedVendor;
  }
}
