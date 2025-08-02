import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "../styles/BookAdminForm.css"
import { createBook, updateBook } from "../services/bookService"; 

export default function BookAdminForm({ book, onCancel, onUpdated, theLoaiList }) {
  const isEdit = Boolean(book);

  const [form, setForm] = useState({
    tenSach: "",
    moTa: "",
    giaNhap: "",
    giaBan: "",
    soLuongKho: "",
    maTacGia: "",
    maNXB: "",
    ngayXuatBan: "",
    anhBia: "",
    theLoaiList: [],
  });

  useEffect(() => {
    if (book) {
      setForm({
        ...book,
        ngayXuatBan: book.ngayXuatBan?.split("T")[0] || "", 
        theLoaiList: book.theLoaiList?.map((tl) => tl.maTheLoai) || [],
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["giaNhap", "giaBan", "soLuongKho", "maTacGia", "maNXB"];

    if (numericFields.includes(name)) {
      setForm({ ...form, [name]: value === "" ? "" : parseInt(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleTheLoaiChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      setForm({ ...form, theLoaiList: [...form.theLoaiList, value] });
    } else {
      setForm({ ...form, theLoaiList: form.theLoaiList.filter((id) => id !== value) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      theLoaiList: form.theLoaiList.map((id) => ({ maTheLoai: id })),
    };
    console.log("✅ Final payload: ", payload);

    if (!form.tenSach || !form.giaBan || !form.maTacGia || !form.ngayXuatBan) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      if (isEdit) {
        await updateBook(book.maSach, payload);
        toast.success("✔️ Cập nhật sách thành công");
      } else {
        await createBook(payload);
        toast.success("✔️ Thêm sách mới thành công");
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
        <input name="tenSach" value={form.tenSach} onChange={handleChange} placeholder="Tên sách" required />
        <textarea name="moTa" value={form.moTa} onChange={handleChange} placeholder="Mô tả" />
        <input name="giaNhap" value={form.giaNhap} onChange={handleChange} type="number" placeholder="Giá nhập" required />
        <input name="giaBan" value={form.giaBan} onChange={handleChange} type="number" placeholder="Giá bán"  required/>
        <input name="soLuongKho" value={form.soLuongKho} onChange={handleChange} type="number" placeholder="Số lượng" />
        <input name="maTacGia" value={form.maTacGia} onChange={handleChange} placeholder="Mã tác giả" />
        <input name="maNXB" value={form.maNXB} onChange={handleChange} placeholder="Mã NXB" />
        <input name="ngayXuatBan" value={form.ngayXuatBan} onChange={handleChange} type="date" />
        <input name="anhBia" value={form.anhBia} onChange={handleChange} placeholder="Link ảnh bìa" />

        <div class="checkbox-group">
          <strong>Thể loại:</strong>
          {theLoaiList.map((tl) => (
            <label key={tl.maTheLoai}>
              <input
                type="checkbox"
                value={tl.maTheLoai}
                checked={form.theLoaiList.includes(tl.maTheLoai)}
                onChange={handleTheLoaiChange}
              />
              {tl.tenTheLoai}
            </label>
          ))}
        </div>

        <div class="button-group">
          <button type="submit" class="btn btn-primary">{isEdit ? "Cập nhật" : "Thêm mới"}</button>
          <button type="button" class="btn btn-secondary" onClick={onCancel}>Huỷ</button>
        </div>

      </form>
    </div>
  );
}
