export interface UserFormData {
  name: string;
  phone: string;
  workshop: string;
  email: string;
  password: string;
  role: string;
  status: "On Duty" | "On Leave";
}

export interface TableProps<T> {
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}
