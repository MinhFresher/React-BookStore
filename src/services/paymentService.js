import axios from "axios";

const API_URL = "http://localhost:8080/api/thanhtoan";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getAllThanhToan = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getAllThanhToan:", error.response?.data || error.message);
    throw error;
  }
};

export const updateThanhToan = async (id, updatedData) => {
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