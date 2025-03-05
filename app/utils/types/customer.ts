export interface Vehicle {
  name: string;
  year: number;
  make: string;
}

export interface ServiceHistory {
  jobOrderId: string;
  date: string;
  serviceRendered: string;
}

export interface CustomerDetails {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  plateNumber: string;
  totalVehicles: number;
  outstandingPayment: number;
  currentJobOrderStatus: string;
}

export interface CustomerResponse {
  success: boolean;
  data: {
    customerDetails: Customer[];
    vehicles: Vehicle[];
    serviceHistory: ServiceHistory[];
  };
}

export interface Customer {
  serviceHistory: ServiceHistory[];
  vehicles: Vehicle[];
  birthDate: string | number | Date;
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  plateNumber: string;
  totalVehicles: number;
  outstandingPayment: number;
  currentJobOrderStatus: string;
}

export interface CustomersResponse {
  success: boolean;
  data: {
    customers: Customer[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}
