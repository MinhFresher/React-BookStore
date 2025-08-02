import axios from "axios";

const API_URL = 'http://localhost:8080/api/theloai/manage';

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

export const getAllTheLoai = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getAllTheLoai:", error.response?.data || error.message);
    throw error;
  }
};

export const createTheLoai = async (createData) => {
  try {
    const response = await axios.post(`${API_URL}`, createData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in create The Loai:", error.response?.data || error.message);
    throw error;
  }
};

export const updateTheLoai= async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in update The Loai:", error.response?.data || error.message);
    throw error;
  }
}; 

export const deleteTheLoai = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("❌ API Error in delete The Loai:", error.response?.data || error.message);
    throw error;
  }
};


export const getSachByTheLoai = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/theloai/${id}/sach`, {

    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getSachByTheLoai:", error.response?.data || error.message);
    throw error;
  }
};