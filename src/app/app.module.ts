import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { DateAdapter, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonModule, DatePipe, DecimalPipe, registerLocaleData } from '@angular/common';
import { NativeDateAdapter } from '@angular/material/core';
import localeAr from '@angular/common/locales/ar';
import {MatTableModule} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { SearchDialogComponent } from './Components/Dialogs/search-dialog/search-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';


registerLocaleData(localeAr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatRippleModule,
    MatTabsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({   // Toastr configuration
      timeOut: 3500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [
    DatePipe,
    DecimalPipe,
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: LOCALE_ID, useValue: 'ar' },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
