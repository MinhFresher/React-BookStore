import axios from 'axios';

const API_URL = 'http://localhost:8080/api/nhaxuatban';

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

export const getAllNxb = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getAllNhaXuatBan:", error.response?.data || error.message);
    throw error;
  }
};

export const createNxb = async (nxbData) => {
  try {
    const response = await axios.post(`${API_URL}`, nxbData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in create Nha Xuat Ban:", error.response?.data || error.message);
    throw error;
  }
};

export const updateNxb = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in update NhaXuatBan:", error.response?.data || error.message);
    throw error;
  }
}; 

export const deleteNxb = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("❌ API Error in delete NhaXuatBan:", error.response?.data || error.message);
    throw error;
  }
};