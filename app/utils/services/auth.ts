import axios from "axios";
import { setCookie } from "cookies-next";
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  UserRole,
} from "../types/auth";


// API base URL - you should store this in an environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth service
export const authService = {
  signup: async (userData: SignupRequest): Promise<SignupResponse> => {
    try {
      const response = await api.post<SignupResponse>("/auths/signup", {
        ...userData,
        role: userData.role || UserRole.CUSTOMER, // Set default role to customer if not provided
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Signup failed");
      }
      throw new Error("An unexpected error occurred");
    }
  },

  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>(
        "/auths/login",
        credentials
      );
      setCookie("token", response.data.token, { maxAge: 24 * 60 * 60 });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Login failed");
      }
      throw new Error("An unexpected error occurred");
    }
  },
};

// export const checkPermission = (allowedRoles: string[]) => {
//   const { user } = useAuth();
//   const router = useRouter();

//   if (!user || !allowedRoles.includes(user.role)) {
//     router.push("/unauthorised");
//     return false;
//   }

//   return true;
// };

// Usage example:
