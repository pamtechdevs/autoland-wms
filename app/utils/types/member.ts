export interface Car {
  model: string;
  plateNumber: string;
  _id: string;
}

export interface Service {
  name: string;
  allowedTimes: number;
  _id: string;
}

export interface Subscription {
  _id: string;
  tier: string;
  price: number;
  serviceFrequencyPerYear: number;
  services: Service[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Member {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  status: string;
  membershipPackage?: string;
  subscription?: Subscription;
  serviceFrequencyPerYear: number;
  cars: Car[];
  qrCode?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MemberResponse {
  success: boolean;
  data: Member[];
}

// Update the interface to match the API response
export interface SubscriptionTier {
  _id?: string;
  tier: string;
  price: number;
  serviceFrequencyPerYear: number;
  services: {
    name: string;
    allowedTimes: number;
    _id?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscriptionTierForm {
  _id?: string;
  tier: string;
  price: number;
  serviceFrequencyPerYear: number;
  services: Service[];
  createdAt?: string;
  updatedAt?: string;
}
