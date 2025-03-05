export interface Staff {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  workshop: string;
  role: string;

  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface StaffFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  workshop: string;
  password?: string;
  role: string;
  status: string;
}
