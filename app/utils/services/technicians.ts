import axios from "axios";
import { getCookie } from "cookies-next"; // Import getCookie to retrieve the token
import { Technician, TechnicianFormData } from "../types/technicians"; // Adjust the import based on your structure

export const fetchTechnicians = async (): Promise<Technician[]> => {
  const token = getCookie("token"); // Get the token from cookies
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/technicians`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );

    return response.data.data; // Return the technicians data
  } catch (error) {
    console.error("Error fetching technicians:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const addTechnician = async (
  technicianData: Omit<Technician, "_id" | "createdAt" | "updatedAt">
): Promise<Technician> => {
  const token = getCookie("token"); // Get the token from cookies
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/create`,
      technicianData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );
    return response.data.data; // Return the added technician data
  } catch (error) {
    console.error("Error adding technician:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const updateTechnician = async (
  id: string,
  data: TechnicianFormData
): Promise<Technician> => {
  const token = getCookie("token"); // Get the token from cookies

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/${id}`,
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

export const deleteTechnician = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const token = getCookie("token"); // Get the token from cookies

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/${id}`,
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
