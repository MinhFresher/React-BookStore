import axios from "axios";

const API_URL = "http://localhost:8080/api/chitietdonhang";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getChiTietByDonHang = async (maDonHang) => {
  try {
    const res = await axios.get(`${API_URL}/donhang/${maDonHang}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (err) {
    console.error("❌ Error getting ChiTietDonHang:", err);
    throw err;
  }
};
