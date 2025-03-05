import axios from "axios";
import { getCookie } from "cookies-next"; // Import getCookie to retrieve the token
import { CustomerResponse, CustomersResponse } from "../types/customer";

export const fetchCustomers = async (
  page: number,
  limit: number
): Promise<CustomersResponse> => {
  const token = getCookie("token"); // Get the token from cookies
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/users/customers?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    return response.data; // Return the customers data
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// New function to fetch customer details
export const fetchCustomerDetails = async (
  customerId: string
): Promise<CustomerResponse> => {
  const token = getCookie("token"); // Get the token from cookies
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/users/customers/${customerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );
    return response.data; // Return the customer details data
  } catch (error) {
    console.error("Error fetching customer details:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
