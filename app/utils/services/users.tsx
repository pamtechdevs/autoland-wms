import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface UserResponse {
  success: boolean;
  data: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    workshop: string;
    status: string;
    vehicles: string[];
    createdAt: string;
    updatedAt: string;
  };
}

export const userService = {
  async getUserDetails(userId: string): Promise<UserResponse> {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}`);

      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to fetch user details"
      );
    }
  },
};
