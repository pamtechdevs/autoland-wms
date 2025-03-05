import axios from "axios";
import { getCookie } from "cookies-next";
import { MemberResponse } from "../types/member";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = getCookie("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const memberService = {
  getAllMembers: async (): Promise<MemberResponse> => {
    try {
      const response = await api.get<MemberResponse>("/workshops/members");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch members"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  },

  addMember: async (memberData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    subscriptionId: string;
    cars: { model: string; plateNumber: string }[];
  }) => {
    try {
      const response = await api.post("/workshops/members", memberData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to add member"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  },

  deleteMember: async (memberId: string) => {
    try {
      const response = await api.delete(`/workshops/members/${memberId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to delete member"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  },

  getDashboardStats: async () => {
    try {
      const response = await api.get("/workshops/members/dashboard/stats");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch dashboard stats"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  },

  getAllSubscriptions: async () => {
    try {
      const response = await api.get("/workshops/subscriptions");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch subscription plans"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  },

  createSubscription: async (subscriptionData: {
    tier: string;
    price: number;
    serviceFrequencyPerYear: number;
    services: { name: string; allowedTimes: number }[];
  }) => {
    try {
      const response = await api.post(
        "/workshops/subscriptions",
        subscriptionData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to create subscription plan"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  },
   updateMember: async (
    memberId: string,
    data: { serviceFrequencyPerYear: number }
  ) => {
    try {
      const response = await api.patch(`/workshops/members/${memberId}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to update member"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  },
};
