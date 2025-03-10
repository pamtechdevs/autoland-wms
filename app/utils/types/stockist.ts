export interface StockistCustomerDetails {
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
  
  export interface StockistPartAndService {
    partNo: string;
    partName: string;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }
  
  export interface StockistCostSummary {
    labour: number;
    sundries: number;
    vat: number;
    estimator: string;
  }
  
  export interface StockistFormData {
    _id?: string;
    jobOrderId: string;
    customerDetails: StockistCustomerDetails;
    partsAndServices: StockistPartAndService[];
    costSummary: StockistCostSummary;
  }
  
  export interface StockistResponse {
    success: boolean;
    data: StockistFormData;
  }
  