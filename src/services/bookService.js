import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

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

export const getAllBook = () => axios.get(`${API_URL}/sach`);
export const getBookById = (id) => axios.get(`${API_URL}/sach/${id}`);
export const getBooksByTheLoai = (theLoaiId) => axios.get(`${API_URL}/theloai/${theLoaiId}/sach`);

export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/sach`);
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getAllBooks:", error.response?.data || error.message);
    throw error;
  }
};

export const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_URL}/sach`, bookData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in createBook:", error.response?.data || error.message);
    throw error;
  }
};

export const updateBook = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/sach/${id}`, updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in updateBook:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    await axios.delete(`${API_URL}/sach/${id}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("❌ API Error in deleteBook:", error.response?.data || error.message);
    throw error;
  }
};