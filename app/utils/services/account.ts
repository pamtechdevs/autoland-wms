import axios from "axios";
import { getCookie } from "cookies-next";
import {
  PaymentRequest,
  PaymentRecord,
  PaymentSummary,
  PaymentUpdateResponse,
  PaymentHistory,
} from "../types/account";
import { log } from "console";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const addPayment = async (
  payment: PaymentRequest
): Promise<PaymentRecord> => {
  const token = getCookie("token");
  const response = await axios.post(`${BASE_URL}/workshops/payments`, payment, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data.data;
};

export const getPaymentHistory = async (
  jobId: string
): Promise<PaymentHistory[]> => {
  const token = getCookie("token");
  const response = await axios.get(
    `${BASE_URL}/workshops/payments/history/${jobId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data;
};

export const getPaymentSummary = async (
  jobId: string
): Promise<PaymentSummary> => {
  const token = getCookie("token");
  const response = await axios.get(
    `${BASE_URL}/workshops/payments/${jobId}/summary`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data.data;
};

export const updatePayment = async (
  paymentId: string,
  data: {
    amount: number;
    paymentPhase: string;
    paymentMethod: string;
    totalAmountDue: number;
  }
): Promise<PaymentRecord> => {
  const token = getCookie("token");
  const response = await axios.put(
    `${BASE_URL}/workshops/payments/${paymentId}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data;
};
