import axios from 'axios';

const API_URL = 'http://localhost:8080/api/donhang';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("🔒 No authentication token found.");
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getAllOrders:", error.response?.data || error.message);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getOrderById:", error.response?.data || error.message);
    throw error;
  }
};

export const getOrdersByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/nguoidung/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getOrdersByUser:", error.response?.data || error.message);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}`, orderData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in createOrder:", error.response?.data || error.message);
    throw error;
  }
};

export const updateOrder = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in updateOrder:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("❌ API Error in deleteOrder:", error.response?.data || error.message);
    throw error;
  }
};