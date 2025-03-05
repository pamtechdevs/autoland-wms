export interface Payment {
  _id?: string;
  jobOrderId: string;
  amount: number;
  totalAmountDue: number;
  paymentPhase: string;
  paymentMethod: string;
  date?: string;
}

export interface PaymentMetrics {
  jobOrderId: string;
  totalJobAmount: number;
  previouslyPaid: number;
  remainingBalance: number;
}

export interface PaymentHistory {
  _id: string;
  jobOrderId: string;
  paymentPhase: string;
  paymentMethod: string;
  date: string;
  amount: number;
}

export interface PaymentSummary {
  jobOrderId: string;
  totalJobAmount: number;
  previouslyPaid: number;
  remainingBalance: number;
}

export interface PaymentRequest {
  jobOrderId: string;
  amount: number;
  totalAmountDue: number;
  paymentPhase: string;
  paymentMethod: string;
}

export interface PaymentRecord {
  _id: string;
  jobOrderId: string;
  paymentPhase: string;
  paymentMethod: string;
  date: string;
  amount: number;
}

export interface PaymentUpdateResponse {
  message: string;
}
