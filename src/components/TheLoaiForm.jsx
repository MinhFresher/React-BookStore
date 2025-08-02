import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { createTheLoai, updateTheLoai } from "../services/categoryService";
import "../styles/TacGiaForm.css";

export default function TheLoaiForm ({ theloai, onCancel, onUpdated }){
    const isEdit = Boolean(theloai);

    const [form, setForm] = useState({
        ten: "",
    });

    useEffect(() => {
        if (theloai) {
        setForm({
            ten: theloai.tenTheLoai,
        });
        }
    }, [theloai]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
            tenTheLoai: form.ten,
        };
    
        console.log("✅ Final payload: ", payload);
    
        if (!form.ten) {
          toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
          return;
        }
    
        try {
          if (isEdit) {
            await updateTheLoai(theloai.maTheLoai, payload);
            toast.success("✔️ Cập nhật thành công");
          } else {
            await createTheLoai(payload);
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
            <input name="ten" value={form.ten} onChange={handleChange} placeholder="Tên thể loại" required />
            <button type="submit">{isEdit ? "Cập nhật" : "Thêm mới"}</button>
            <button type="button" onClick={onCancel}>Huỷ</button>
            </form>
        </div>
    );
}