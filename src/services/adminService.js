import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin';

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

export const getStatistic = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error in getAllTacGia:", error.response?.data || error.message);
    throw error;
  }
};

