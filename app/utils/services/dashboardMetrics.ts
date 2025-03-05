import axios from "axios";
import { DashboardMetrics } from "../types/dashboardMetrics";

export const fetchDashboardMetrics = async (): Promise<DashboardMetrics> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/job-orders/dashboard/stats`
    );
    const { totalIncome, totalOutflow, netProfit } = response.data.data; // Destructure the relevant data
    return { totalIncome, totalOutflow, netProfit }; // Return the relevant data
  } catch (error) {
    console.error("Error fetching job orders statistics:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
