import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { createNxb, updateNxb } from "../services/NxbService";
import "../styles/TacGiaForm.css";

export default function NxbForm({ nxb, onCancel, onUpdated }) {
  const isEdit = Boolean(nxb);

  const [form, setForm] = useState({
    ten: "",
    email: "",
    gioiThieu: "",
  });

  useEffect(() => {
    if (nxb) {
      setForm({
        ten: nxb.tenNXB,
        email: nxb.email,
        gioiThieu: nxb.gioiThieu,
      });
    }
  }, [nxb]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        tenNXB: form.ten,
        email: form.email,
        gioiThieu: form.gioiThieu,
    };

    console.log("✅ Final payload: ", payload);

    if (!form.ten || !form.email) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      if (isEdit) {
        await updateNxb(nxb.maNXB, payload);
        toast.success("✔️ Cập nhật thành công");
      } else {
        await createNxb(payload);
        toast.success("✔️ Thêm mới thành công");
      }
      onUpdated();
      onCancel();
    } catch (err) {
      console.error("❌ Failed:", err);
      const errorMessage = err.response?.data?.message || "Thất bại, vui lòng thử lại";
      toast.error(`❌ ${errorMessage}`);
    }
  };

  return (
    <div className="overlay-form">
        <form onSubmit={handleSubmit} className="form-container">
        <input name="ten" value={form.ten} onChange={handleChange} placeholder="Tên nhà xuất bản" required />
        <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" required />
        <input name="gioiThieu" value={form.gioiThieu} onChange={handleChange}  placeholder="Giới thiệu"  required/>
        <button type="submit">{isEdit ? "Cập nhật" : "Thêm mới"}</button>
        <button type="button" onClick={onCancel}>Huỷ</button>
        </form>
    </div>
  );
}
