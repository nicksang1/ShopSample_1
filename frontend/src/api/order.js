// api/order.js
import axios from "./axios";

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post("/orders", orderData);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError && axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.status, error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getOrders = async (orderData) => {
  try {
    const response = await axios.get("/orders", orderData);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError && axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.status, error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`/orders/${id}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.status, error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};