import axios from "axios";
import { JobOrderTableType } from "../types/jobOrder";
import { JobOrderData, JobOrderFormData } from "../types/formData";
import { getCookie } from "cookies-next";

export const fetchJobOrders = async (
  page: number,
  limit: number
): Promise<JobOrderTableType[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/job-orders/table?page=${page}&limit=${limit}`
    );

    return response.data.data; // Return the data
  } catch (error) {
    console.error("Error fetching job orders:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const createJobOrder = async (
  data: JobOrderFormData
): Promise<JobOrderFormData> => {
  const token = getCookie("token");
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/job-orders`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    return response.data.data; // Return the data
  } catch (error) {
    console.error("Error creating job order:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const updateJobOrder = async (
  jobOrderId: string,
  data: JobOrderFormData
): Promise<JobOrderData> => {
  const token = getCookie("token");
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/job-orders/${jobOrderId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    return response.data.data; // Return the data
  } catch (error) {
    console.error("Error creating job order:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
export const fetchJobOrder = async (
  jobOrderId: string
): Promise<JobOrderData> => {
  const token = getCookie("token");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/job-orders/${jobOrderId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    return response.data.data; // Return the data
  } catch (error) {
    console.error("Error creating job order:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
