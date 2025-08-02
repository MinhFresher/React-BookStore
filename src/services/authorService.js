import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tacgia';

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

export const getAllTacGia = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getAllTacGia:", error.response?.data || error.message);
    throw error;
  }
};

export const createTacGia = async (tacGiaData) => {
  try {
    const response = await axios.post(`${API_URL}`, tacGiaData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in createTacGia:", error.response?.data || error.message);
    throw error;
  }
};

export const updateTacGia = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in updateTacGia:", error.response?.data || error.message);
    throw error;
  }
}; 

export const deleteTacGia = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("❌ API Error in deleteBook:", error.response?.data || error.message);
    throw error;
  }
};