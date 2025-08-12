import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { updateNguoiDung } from "../services/userService";
import "../styles/TacGiaForm.css"
export default function UserAdminForm({ user, onCancel, onUpdated }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({ ...user });
    }
  }, [user]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateNguoiDung(form.maNguoiDung, form);
      toast.success("✔️Cập nhật thành công");
      onUpdated(); 
      onCancel();  
    } catch (err) {
      console.error("❌ Update failed:", err);
      toast.error("Cập nhật thất bại");
    }
  };

  if (!form) return null; // prevent crashing

  return (
    <div className="overlay-form">
      <form onSubmit={handleUpdate} className="form-container">
        <h3>📝 Sửa thông tin người dùng</h3>
        <input
          type="text"
          name="tenDangNhap"
          value={form.tenDangNhap}
          onChange={onChange}
          placeholder="Tên đăng nhập"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="soDienThoai"
          value={form.soDienThoai || ""}
          onChange={onChange}
          placeholder="Số điện thoại"
        />
        <input
          type="text"
          name="diaChi"
          value={form.diaChi || ""}
          onChange={onChange}
          placeholder="Địa chỉ"
        />
        <select name="vaiTro" value={form.vaiTro} onChange={onChange}>
          <option value="NhanVien">NhanVien</option>
          <option value="QuanTri">QuanTri</option>
          <option value="KhachHang">KhachHang</option>
        </select>
        <br />
        <button type="submit">Lưu</button>
        <button type="button" onClick={onCancel}>Huỷ</button>
      </form>
    </div>
  );
}
