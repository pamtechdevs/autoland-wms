export interface VehicleDetails {
  modelMake: string;
  chassisNo: string;
  plateNo: string;
  year: number;
  mileage: number;
}

export interface PartsAndService {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface TotalSummary {
  totalExclVAT: number;
  vat: string;
  totalInclVAT: string;
}

export interface InvoiceData {
  staffName: string;
  customerName: string;
  date: string;
  contactPerson: string;
  vehicleDetails: VehicleDetails;
  partsAndServices: PartsAndService[];
  totalSummary: TotalSummary;
}
