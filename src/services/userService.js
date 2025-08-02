import axios from "axios";

const API_URL = "http://localhost:8080/api/nguoidung";

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

export const getAllNguoiDung = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getAllNguoiDung:", error.response?.data || error.message);
    throw error;
  }
};

export const getNguoiDungById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getUserrById:", error.response?.data || error.message);
    throw error;
  }
};

export const updateNguoiDung = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in updateNguoiDung:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteNguoiDung = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("❌ API Error in deleteNguoiDung:", error.response?.data || error.message);
    throw error;
  }
};