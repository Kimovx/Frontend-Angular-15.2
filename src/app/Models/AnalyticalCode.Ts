export interface AnalyticalCode {
  aId: number;
  parentAId?: number; // Nullable
  codeLevel: number;
  codeLevelType: number;
  code: string;
  descA: string;
  descE: string;
  stopped: boolean;
  accountId: number;
  costCenterId: number;
  assetId: number;
  empId: number;
  bsPartnerId: number;
  customerId: number;
  vendorId: number;
  itemCardId: number;
  accomulatAId: number;

  // Additional fields
  addField1?: string;
  addField2?: string;
  addField3?: string;
  addField4?: string;
  addField5?: string;
  addField6?: string;
  addField7?: string;
  addField8?: string;
  addField9?: string;
  addField10?: string;
  addField11?: string;
  addField12?: string;
  addField13?: string;
  addField14?: string;
  addField15?: string;
  addField16?: string;
  addField17?: string;
  addField18?: string;
  addField19?: string;
  addField20?: string;
  addField21?: string;
  addField22?: string;
  addField23?: string;
  addField24?: string;
  addField25?: string;
  addField26?: string;
  addField27?: string;
  addField28?: string;
  addField29?: string;
  addField30?: string;

  // Date fields
  anDate1?: Date; // Nullable
  anDate2?: Date; // Nullable
  anDate3?: Date; // Nullable
  isNotify1: boolean;
  notifyDate1?: Date; // Nullable
  isNotify2: boolean;
  notifyDate2?: Date; // Nullable
  isNotify3: boolean;
  notifyDate3?: Date; // Nullable

  remarksA: string;
  remarksE: string;
  createdBy: string;
  createdAt: Date;
  updateBy: string;
  updateAt: Date;
  deletedBy: string;
  deletedAt?: Date; // Nullable
}
