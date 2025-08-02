import { useEffect, useState } from "react";
import { getNguoiDungById, updateNguoiDung } from "../services/userService";
import UserEditForm from "./UserEditForm"; 

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    tenDangNhap: "",
    email: "",
    soDienThoai: "",
    diaChi: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);  

  useEffect(() => {
    const maNguoiDung = localStorage.getItem("maNguoiDung");
    if (!maNguoiDung) return;

    const fetchUser = async () => {
      try {
        const data = await getNguoiDungById(maNguoiDung);
        setUser(data);
        setForm({
          tenDangNhap: data.tenDangNhap || "",
          email: data.email || "",
          soDienThoai: data.soDienThoai || "",
          diaChi: data.diaChi || "",
        });
      } catch (err) {
        console.error("❌ Failed to fetch user info:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const maNguoiDung = localStorage.getItem("maNguoiDung");
    if (!maNguoiDung) return;

    setIsUpdating(true);
    try {
      await updateNguoiDung(maNguoiDung, form);
      alert("✅ Cập nhật thông tin thành công!");

      // Optional: update `user` too after saving
      setUser((prev) => ({
        ...prev,
        ...form,
      }));
    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("❌ Có lỗi khi cập nhật thông tin!");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) return <p>🔄 Loading user info...</p>;

  return (
    <div className="info-form">
      <div className="info-display">
        <h2>👤 Thông tin cá nhân</h2>
        <p><strong>👤 Họ tên:</strong> {user.tenDangNhap}</p>
        <p><strong>📧 Email:</strong> {user.email}</p>
        <p><strong>📞 Số điện thoại:</strong> {user.soDienThoai || "Chưa cập nhật"}</p>
        <p><strong>🏠 Địa chỉ:</strong> {user.diaChi || "Chưa cập nhật"}</p>
      </div>

      <div className="userinfo-btn">
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "❌ Hủy" : " Sửa Thông Tin"}
        </button>

        {isEditing && (
          <div>
            <UserEditForm
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isUpdating={isUpdating}
            />
          </div>
        )}
      </div>
    </div>
  );
}
