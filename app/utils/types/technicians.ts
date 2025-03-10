export interface Technician {
    _id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    workshop: string;
    specialty: string;
    team: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TechnicianFormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    workshop: string;
    specialty: string;
    team: string;
    status: string;
  }
  