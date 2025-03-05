export interface PartAndService {
  // _id?: string;
  partNo: string;
  partName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface CustomerDetails {
  customerName: string;
  regNo: string;
  vehicleMake: string;
  chassisNo: string;
  modelNo: string;
  date: string;
  jobOrderNo: string;
  phoneNo: string;
  email: string;
}

export interface CostSummary {
  labour: number;
  sundries: number;
  vat: number;
  estimator: string;
}

export interface JobOrderDetails {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  carPlate: string;
  carMake: string;
  carChassis: string;
  carModel?: string; // This might need to come from somewhere else
}

export interface EstimateFormData {
  _id?: string;
  jobOrderId?: {
    _id: string;
    jobOrderId: string;
  };
  customerDetails: CustomerDetails;
  partsAndServices: PartAndService[];
  costSummary: CostSummary;
  createdAt?: string;
  updatedAt?: string;
}

export interface EstimateResponse {
  data: EstimateFormData;
}
