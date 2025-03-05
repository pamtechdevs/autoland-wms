import axios from "axios";
import { getCookie } from "cookies-next"; // Import getCookie to retrieve the token
import { Staff, StaffFormData } from "../types/staff"; // Adjust the import based on your structure

export const fetchStaff = async (): Promise<Staff[]> => {
  const token = getCookie("token"); // Get the token from cookies
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/users`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    // Ensure we return an array
    const staffData = response.data.data.users;
    return staffData;
  } catch (error) {
    console.error("Error fetching staff:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const addStaff = async (
  staffData: Omit<StaffFormData, "_id" | "createdAt" | "updatedAt">
): Promise<StaffFormData> => {
  const token = getCookie("token"); // Get the token from cookies
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/users`,
      staffData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );
    return response.data.data; // Return the added staff data
  } catch (error) {
    console.error("Error adding staff:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const updateStaff = async (
  id: string,
  data: StaffFormData
): Promise<Staff> => {
  const token = getCookie("token"); // Get the token from cookies

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/users/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStaff = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const token = getCookie("token"); // Get the token from cookies

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
