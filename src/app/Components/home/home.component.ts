import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, throwError } from 'rxjs';
import { AnalaticCodeDesc } from 'src/app/Models View/AnalaticCodeDesc';
import { BookDesc } from 'src/app/Models View/BookDesc';
import { CurrencyDesc } from 'src/app/Models View/CurrencyDesc';
import { ItemCard } from 'src/app/Models View/ItemCard';
import { PurchaseOrder } from 'src/app/Models View/PurchaseOrder';
import { PurchaseOrderDetailCreate } from 'src/app/Models View/PurchaseOrderDetailCreate';
import { VendorDesc } from 'src/app/Models View/VendorDesc';
import { DialogService } from 'src/app/Services/dialog.service';
import { PurchaseOrderService } from 'src/app/Services/purchase-order.service';
import { __awaiter } from 'tslib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild ('quantity') quantityElement!: ElementRef;

  displayedColumns: string[] = [
    'itemCode',
    'itemDescA',
    'price1',
    'quantity',
    'unitName',
    'total',
    'options'
  ];

  data: ItemCard[] = [];
  purOrderId?: number;

  purchaseOrderForm: FormGroup;
  orderDetailsFrom: FormGroup;
  purchaseOrderData?: PurchaseOrder;
  dataSource: MatTableDataSource<any>

  allVendors: VendorDesc[];
  allCurrencies: CurrencyDesc[];
  allAnalaticCodes: AnalaticCodeDesc[];
  allBooks: BookDesc[];
  lastPurchaseOrder?: PurchaseOrder;
  allItems: ItemCard[];
  allPurchaseOrderDetails: PurchaseOrderDetailCreate[];

  // Selected IDs
  selectedBookId?: number;
  selectedCurrencyId?: number;
  selectedVendorId?: number;
  selectedAnalaticCodeId?: number;

  // Selected Objects
  selectedVendor: VendorDesc;
  selectedAnalaticCode: AnalaticCodeDesc;

  // Loaders Variables
  isMainDataLoading: boolean;
  isDetailsLoading: boolean;
  isEdit: boolean;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    protected dialogSerivce: DialogService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ){
    this.allBooks = this.allVendors = this.allCurrencies = this.allAnalaticCodes = [];

    // Boolean Variables
    this.isMainDataLoading = false;
    this.isEdit = false;
    this.isDetailsLoading = false;

    this.allItems = [];
    this.selectedVendor = {} as VendorDesc;
    this.selectedAnalaticCode = {} as AnalaticCodeDesc;
    this.purchaseOrderForm = fb.group({});
    this.orderDetailsFrom = fb.group({});
    this.allPurchaseOrderDetails = [];
    this.dataSource = new MatTableDataSource<ItemCard>([]);
  }

  ngOnInit(): void {
    this.fetchData();
    this.installHeaderFrom();
    this.installDetailsFrom();
    this.onStartNewItem();
  }

  installDetailsFrom(){
    this.orderDetailsFrom = this.fb.group({
      itemCode: [''],
      itemName: ['', Validators.required],
      itemQuantity: ['', Validators.required],
      itemPrice: ['', Validators.required],
      itemTotalPrice: ['', Validators.required]
    });
    this.purchaseOrderForm.disable();
  }

  installHeaderFrom(){
    this.purchaseOrderForm = this.fb.group({
      formNumber: [''],
      selectedBookId: [new Number, Validators.required],
      trDate: [new Date, Validators.required],
      arrivalDate: [new Date, Validators.required],
      vendorId: [new Number, Validators.required],
      currencyId: [new Number, Validators.required],
      deliveryPeriodDays: ['', Validators.maxLength(256)],
      manualTrNo: ['', Validators.maxLength(256)],
      invoiceType: [new Number, Validators.required],
      payPeriodDays: ['', Validators.required],
      selectedAnalaticCodeId: [{value: new Number}, Validators.required],
      analyticCodeDesc: ['', Validators.required],
      purchaseBasedOn: ['', Validators.required],
    });
    this.purchaseOrderForm.disable();
  }

  // Start Fetch Functions
  async fetchData(){
    this.isMainDataLoading = true;
    try {
      await this.fetchVendors();
      await this.fetchCurrencies();
      await this.fetchAnalaticCodes();
      await this.fetchBooks();
      this.isMainDataLoading = false;
    }
    catch {
      this.toastr.error('حدث خطأ غير معروف, الرجاء المحاوله مجدداً', 'خطأ');
      this.isMainDataLoading = false;
    }
  }

  async fetchVendors(){
    try {
      this.allVendors = await firstValueFrom(this.purchaseOrderService.getAllVendors());
    }
    catch {
      throw Error;
    }
  }

  async fetchCurrencies(){
    try {
      this.allCurrencies = await firstValueFrom(this.purchaseOrderService.getAllCurrencies());
    }
    catch {
      throw Error;
    }
  }

  async fetchAnalaticCodes(){
    try {
      this.allAnalaticCodes = await firstValueFrom(this.purchaseOrderService.getAllAnalaticCodes());
    }
    catch {
      throw Error;
    }
  }

  async fetchBooks(){
    try {
      this.allBooks = await firstValueFrom(this.purchaseOrderService.getAllBooksWithTermType18());
    }
    catch {
      throw Error;
    }
  }
  // End Fetch Functions

  startNewForm(){
    this.isEdit = true;
    this.purchaseOrderForm.enable();
    this.purchaseOrderForm.reset();
    this.purchaseOrderForm.patchValue({
      formNumber: 'جديد',
      trDate: new Date,
      arrivalDate: new Date
    })
  }

  onVendorSelection(){
    this.selectedVendorId = this.purchaseOrderForm.get('vendorId')?.value
    this.selectedVendor = this.allVendors.find(v => this.selectedVendorId === v.vendorId)!;

    this.purchaseOrderForm.patchValue({
      currencyId: this.selectedVendor.currencyId
    })
  }

  onAnalaticCodeSelection(){
    this.selectedAnalaticCodeId = this.purchaseOrderForm.get('selectedAnalaticCodeId')?.value;
    this.selectedAnalaticCode = this.allAnalaticCodes.find(a => this.selectedAnalaticCodeId === a.aId)!;

    this.purchaseOrderForm.patchValue({
      analyticCodeDesc: this.selectedAnalaticCode.descA
    })
  }

  async openVendorSearchDialog(){
    await this.dialogSerivce.openSearchDialog().then(
      res=>{
        this.selectedVendor = res!;
        this.selectedVendorId = this.selectedVendor?.vendorId;
        this.selectedCurrencyId = this.selectedVendor?.currencyId;

        this.purchaseOrderForm.patchValue({
          currencyId: this.selectedCurrencyId,
          vendorId: this.selectedVendorId,
        })
      }
    );
  }

  // Start Detail
  async fetchAllItems(){
    try {
      this.allItems = await firstValueFrom(this.purchaseOrderService.getAllItems());
    }
    catch {
      this.toastr.error('حدث خطأ غير معروف, الرجاء المحاوله مجدداً', 'خطأ');
    }
  }

  async onStartNewItem(){
    this.isDetailsLoading = true;
    await this.fetchAllItems();
    this.isDetailsLoading = false;
  }

  addItem(){
    this.isDetailsLoading = true;

    this.data = this.dataSource.data;

    const newRow: ItemCard = {} as ItemCard;
    this.data.push(newRow);
    this.dataSource = new MatTableDataSource(this.data)

    this.isDetailsLoading = false;
  }

  onItemNameChange(index: number, itemId: number){
    const selectedItem = this.allItems.find(i => i.itemCardId === itemId);
    this.dataSource.data[index].itemCode = selectedItem?.itemCode!;
    this.dataSource.data[index].price1 = selectedItem?.price1!;
    this.dataSource.data[index].unitName = selectedItem?.unitName!;
    this.dataSource.data[index].itemDescA = selectedItem?.itemDescA!;
    this.dataSource.data[index].itemCardId = selectedItem?.itemCardId!;
    this.dataSource.data[index].total = selectedItem?.price1! * this.quantityElement.nativeElement.value;
  }

  onQuantityChange(index: number, event: Event){
    const quantityElement = event.target as HTMLInputElement;
    const quantity = +quantityElement.value;
    const price = this.dataSource.data[index].price1;

    const total = price * quantity;

    this.dataSource.data[index].total = total;
    this.dataSource.data[index].quantity = quantity;

  }
  // End Detail

  // Tool Bar Options
  enableEdit(){
    this.isEdit = true;
    this.purchaseOrderForm.enable();
  }

  async getPurchaseOrderDetails(purchaseOrderId: number){
    try {
      this.allPurchaseOrderDetails = await firstValueFrom(this.purchaseOrderService.getPurchaseOrderDetails(purchaseOrderId));

      if(this.allPurchaseOrderDetails.length <= 0){
        this.toastr.warning('لا يوجد أصناف لهذا الطلب');
      }
      else {
        const data: any[] = [];
        this.dataSource = new MatTableDataSource<any>([]);

        this.allPurchaseOrderDetails.forEach( (item)=>{
          const itemData: any = this.allItems.find(i => item.itemCardId == i.itemCardId)!;
          itemData.quantity = item.quantity;
          itemData.total = item.quantity * item.price;
          itemData.itemCardId = item.itemCardId;
          data.push(itemData);
        });
        this.dataSource = new MatTableDataSource<any>(data);
      }
    }
    catch {
      this.toastr.error('لم يتم استعادة الأصناف');
      throw Error;
    }
  }

  async getLast(){
    this.isEdit = false;
    this.isMainDataLoading = true;
    this.isDetailsLoading = true;

    this.purchaseOrderService.getLastPurchaseOrder().subscribe({
      next: async (order) =>{
        this.lastPurchaseOrder = order;
        const analyticCode = this.allAnalaticCodes.find(a => a.aId == this.lastPurchaseOrder?.aId);

        this.purchaseOrderForm.patchValue({
          selectedBookId: this.lastPurchaseOrder.bookId,
          formNumber: this.lastPurchaseOrder.purOrderId,
          currencyId: this.lastPurchaseOrder.currencyId,
          vendorId: this.lastPurchaseOrder.vendorId,
          arrivalDate: this.lastPurchaseOrder.arrivalDate,
          deliveryPeriodDays: this.lastPurchaseOrder.deliveryPeriodDays,
          invoiceType: +this.lastPurchaseOrder.invoiceType,
          manualTrNo: this.lastPurchaseOrder.manualTrNo,
          trDate: this.lastPurchaseOrder.trDate,
          analyticCodeDesc: analyticCode?.descA,
          selectedAnalaticCodeId: this.lastPurchaseOrder.aId,
          payPeriodDays: this.lastPurchaseOrder.payPeriodDays,
        });

        if(order.purOrderId){
          await this.getPurchaseOrderDetails(order.purOrderId).catch(
            ()=>{
              this.isDetailsLoading = false;
              this.isMainDataLoading = false;
            }
          );
        }

        this.isDetailsLoading = false;
        this.isMainDataLoading = false;
      },
      error: (error: HttpErrorResponse)=>{
        this.toastr.error(`${error.message}`);
      }
    })
  }

  removeItem(index: number){
    const data = [...this.dataSource.data];
    data.splice(index, 1);
    this.dataSource = new MatTableDataSource<any>([]);
    this.dataSource = new MatTableDataSource<any>(data);
    console.log(data);
    console.log(this.dataSource.data);
  }

  async createPurchaseOrderHeader(purchaseOrderData: PurchaseOrder){
    try {
      const response: any = await firstValueFrom(this.purchaseOrderService.createPurchaseOrder(purchaseOrderData))
      this.toastr.success(`تم إضافة أمر الشراء بنجاح`);
      this.purOrderId = response.purchaseOrderId;
    }
    catch {
      this.toastr.error('حدث خطأ غير معروف, الرجاء المحاوله مجدداً', 'خطأ');
      throw Error;
    }
  }

  async createPurchaseOrderDetail(purchaseOrderDetailData: PurchaseOrderDetailCreate[]){
    try {
      const response: any = await firstValueFrom(this.purchaseOrderService.createPurchaseOrderDetail(purchaseOrderDetailData));
      this.toastr.success(`${response.message}`);
    }
    catch {
      this.toastr.error('حدث خطأ غير معروف, الرجاء المحاوله مجدداً', 'خطأ');
    }
  }

  async onSubmit() {
    this.isMainDataLoading = true;
    this.isDetailsLoading = true;

    this.purOrderId = undefined;

    if (this.purchaseOrderForm.valid) {
      const purchaseOrderData: PurchaseOrder = {
        vendorId: this.purchaseOrderForm.get('vendorId')?.value,
        currencyId: this.purchaseOrderForm.get('currencyId')?.value,
        arrivalDate: this.purchaseOrderForm.get('arrivalDate')?.value,
        invoiceType: this.purchaseOrderForm.get('invoiceType')?.value,
        deliveryPeriodDays: this.purchaseOrderForm.get('deliveryPeriodDays')?.value,
        termType: 18,
        manualTrNo: this.purchaseOrderForm.get('manualTrNo')?.value,
        payPeriodDays: this.purchaseOrderForm.get('payPeriodDays')?.value,
        trDate: this.purchaseOrderForm.get('trDate')?.value,
        aId: this.purchaseOrderForm.get('selectedAnalaticCodeId')?.value,
      }

      await this.createPurchaseOrderHeader(purchaseOrderData);

      const purchaseOrderDetailData: PurchaseOrderDetailCreate[] = [];
      this.dataSource.data.forEach((d, index: number)=>{
        const order: PurchaseOrderDetailCreate = {
          itemCardDesc: d.itemDescA,
          itemCardId: d.itemCardId,
          price: d.price1,
          quantity: d.quantity,
          purOrderId: this.purOrderId!
        }
        purchaseOrderDetailData.push(order);
      })

      if(purchaseOrderDetailData.length > 0){
        await this.createPurchaseOrderDetail(purchaseOrderDetailData);
      }
      else {
        this.toastr.warning('لم يتم إضافة اصناف');
      }
      this.isMainDataLoading = false;
      this.isDetailsLoading = false;
    }
  }
}
