import axios from "axios";
import { BookingStats } from "../types/bookingStats";

export const fetchBookingStats = async (): Promise<BookingStats> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/job-orders/stats`
    );
    const { total, ongoing, completed, pending } = response.data.data; // Destructure the relevant data
    return { total, ongoing, completed, pending }; // Return the relevant data
  } catch (error) {
    console.error("Error fetching booking statistics:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
