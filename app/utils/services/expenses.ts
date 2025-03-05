import axios from "axios";
import { getCookie } from "cookies-next"; // Import getCookie to retrieve the token
import { ExpensesResponse, AddExpense } from "../types/expenses"; // Import the ExpensesResponse interface
import { Expense } from "../types/expenses"; // Import the Expense interface

export const fetchExpenses = async (
  category: string,
  page: number,
  limit: number
): Promise<ExpensesResponse> => {
  const token = getCookie("token"); // Get the token from cookies
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/expenses?category=${category}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );
    return response.data; // Return the expenses data
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
export const addExpense = async (expenseData: AddExpense): Promise<Expense> => {
  const token = getCookie("token"); // Get the token from cookies

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/expenses`,
      expenseData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    return response.data.data; // Return the added expense data
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const updateExpense = async (
  expenseId: string,
  expenseData: Partial<Expense>
): Promise<Expense> => {
  const token = getCookie("token"); // Get the token from cookies
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/expenses/${expenseId}`,
      expenseData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

export const deleteExpense = async (expenseId: string): Promise<void> => {
  const token = getCookie("token"); // Get the token from cookies
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/expenses/${expenseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
