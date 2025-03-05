import CarDetail from "../../autoclub/members/page";
import { SubscriptionTier } from "./member";
export interface ServiceFeature {
  id: string;
  name: string;
  description: string;
  frequency: number; // Number of times this service can be used
}
// Define the type for dashboard stats
export interface DashboardStats {
  platinumUsers: number;
  diamondUsers: number;
  goldUsers: number;
  silverUsers: number;
}

export interface AutoClubMember {
  id: string;
  name: string;
  phone: string;
  email: string;
  subscription: SubscriptionTier;
  status: "Active" | "Inactive" | "Expired";
  cars: CarDetail[];
  startDate: Date;
  endDate: Date;
}
export interface CarDetail {
  carModel: string;
  plateNumber: string;
}
