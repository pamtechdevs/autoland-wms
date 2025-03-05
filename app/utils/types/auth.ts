export enum UserRole {
  WORKSHOP_MANAGER = "workshopManager",
  ACCOUNTANT = "accountant",
  FRONT_DESK = "frontDesk",
  AUTOCLUB = "autoclub",
  CUSTOMER = "customer",
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role?: UserRole;
  workshop?: string;
}

export interface SignupResponse {
  message: string;
  user: {
    id: string;
    fullName: string;
    role: UserRole;
    email: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}
