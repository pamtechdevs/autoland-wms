export interface Appointment {
  id: string;
  customerName: string;
  service: string;
  dateTime: string; // Use string for ISO date format
  vehicle: string;
  status: "pending" | "scheduled" | "completed" | "cancelled" | "approved"; // Include all possible
  email: string;
  appointmentId: string;
}
