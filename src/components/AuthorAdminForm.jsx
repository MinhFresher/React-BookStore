import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { createTacGia, updateTacGia } from "../services/authorService";
import "../styles/TacGiaForm.css";

export default function TacGiaForm({ tacgia, onCancel, onUpdated }) {
  const isEdit = Boolean(tacgia);

  const [form, setForm] = useState({
    ten: "",
    email: "",
    gioiThieu: "",
  });

  useEffect(() => {
    if (tacgia) {
      setForm({
        ten: tacgia.ten,
        email: tacgia.email,
        gioiThieu: tacgia.gioiThieu,
      });
    }
  }, [tacgia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
    };

    console.log("✅ Final payload: ", payload);

    if (!form.ten || !form.email) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      if (isEdit) {
        await updateTacGia(tacgia.maTacGia, payload);
        toast.success("✔️ Cập nhật thành công");
      } else {
        await createTacGia(payload);
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
          <input name="ten" value={form.ten} onChange={handleChange} placeholder="Tên Tác Giả" required />
          <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" required />
          <input name="gioiThieu" value={form.gioiThieu} onChange={handleChange}  placeholder="Giới thiệu"  required/>
          <button type="submit">{isEdit ? "Cập nhật" : "Thêm mới"}</button>
          <button type="button" onClick={onCancel}>Huỷ</button>
        </form>
    </div>
  );
}
