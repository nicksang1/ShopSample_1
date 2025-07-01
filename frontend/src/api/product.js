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
  // console.log(product);
  try {
    const response = await axios.post("/products", product, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(response.data.data);
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

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/products/${id}`);
    // console.log("Product deleted:", response.data);
    return response.data;
  } catch (error) {
    // console.error("Failed to delete product:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedProduct) => {
  try {
    const response = await axios.put(`/products/${id}`, updatedProduct);
    console.log("Product updated:", response.data);
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
