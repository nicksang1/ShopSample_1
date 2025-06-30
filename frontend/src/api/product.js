import axios from "./axios";
export const getProducts = async () => {
  try {
    const response = await axios.get("/products");
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.status, error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error; // Re-throw so the caller can handle it too
  }
};

export const createProduct = async (product) => {
  try {
    const response = await axios.post("/products", product);
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
