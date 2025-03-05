export interface Expense {
  _id: string;
  expenseId: string;
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  createdAt: string; // You can use Date if you want to parse it later
  updatedAt: string; // You can use Date if you want to parse it later
}

export interface ExpensesResponse {
  success: boolean;
  data: {
    expenses: Expense[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface AddExpense {
  category: string | undefined;
  description: string | undefined;
  amount: number | undefined;
  paymentMethod: string | undefined;
}
