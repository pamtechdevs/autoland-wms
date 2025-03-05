import axios from "axios";
import {
  CostSummary,
  EstimateFormData,
  EstimateResponse,
  PartAndService,
} from "../types/estimate";
import { getCookie } from "cookies-next";
import { fetchJobOrder } from "./JobOrder";
import { InvoiceData } from "../types/invoice";

interface EstimateData {
  partsAndServices?: PartAndService[];
  costSummary?: CostSummary;
}

export const fetchEstimate = async (jobId: string): Promise<any> => {
  const token = getCookie("token");

  try {
    const response = await axios.get<any>(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/estimates/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error fetching estimate:", error);
    throw error;
  }
};

export const updateEstimate = async (
  estimateId: string,
  data: any
): Promise<any> => {
  const token = getCookie("token");

  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/estimates/${estimateId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error updating estimate:", error);
    throw error;
  }
};

export const getJobOrderDetailsForEstimate = async (jobId: string) => {
  try {
    const response = await fetchJobOrder(jobId);
    const { jobOrderId, sectionA } = response;

    // Extract only the data we need
    const estimateDetails = {
      customerDetails: {
        customerName: sectionA.clientInformation.clientName,
        regNo: sectionA.vehicleInformation.carPlate,
        vehicleMake: sectionA.vehicleInformation.carMake,
        chassisNo: sectionA.vehicleInformation.carChassis,
        modelNo: "testing", // This might need to be added to your job order form
        date: new Date().toISOString().split("T")[0], // Current date
        jobOrderNo: jobOrderId,
        phoneNo: sectionA.clientInformation.clientPhone,
        email: sectionA.clientInformation.clientEmail,
      },
    };

    return estimateDetails;
  } catch (error) {
    console.error("Error fetching job order details:", error);
    throw error;
  }
};

export const fetchEstimateDetails = async (
  jobId: string
): Promise<EstimateData | null> => {
  const token = getCookie("token");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/estimates/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data.data;

    // Return only parts/services and cost summary if they exist
    return {
      partsAndServices: data?.partsAndServices || [],
      costSummary: data?.costSummary || null,
    };
  } catch (error) {
    console.error("Error fetching estimate details:", error);
    return null;
  }
};

export const createEstimate = async (
  jobId: string,
  data: EstimateFormData
): Promise<EstimateResponse> => {
  const token = getCookie("token");
  try {
    const requestData = {
      jobOrderId: jobId,
      customerDetails: data.customerDetails,
      partsAndServices: data.partsAndServices,
      costSummary: data.costSummary,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/estimates`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating estimate:", error);
    throw error;
  }
};

interface InvoiceResponse {
  success: boolean;
  data: InvoiceData;
}

export const generateInvoice = async (jobId: string): Promise<InvoiceData> => {
  const token = getCookie("token");
  try {
    const response = await axios.get<InvoiceResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/workshops/estimates/invoice/${jobId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching invoice:", error);
    throw error;
  }
};
