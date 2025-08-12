import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { createUser } from "../services/authService";
import "../styles/TacGiaForm.css"

export default function CreateUserForm({ user, onCancel }) {
    const [form, setForm] = useState({
        tenDangNhap: "",
        email: "",
        matKhau: "",
        vaiTro: "NhanVien"
    });

    useEffect(() => {
        if (user) setForm({ ...user });
    }, [user]);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
        await createUser(form);
        toast.success("Add user successfully!");
        onCancel();  
        } catch (err) {
        console.error("❌ Created user failed:", err);
        toast.error("Create user failed");
        }
    };

    if (!form) return null; // prevent crashing

    return (
        <div className="overlay-form">
            <form onSubmit={handleUpdate} className="form-container">
                <h3>📝 Create người dùng</h3>
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
                    type="password" 
                    name="matKhau"
                    value={form.matKhau || ""} 
                    placeholder="Mật khẩu" 
                    onChange={onChange} 
                />

                <select name="vaiTro" value={form.vaiTro} onChange={onChange}>
                    <option value="NhanVien">NhanVien</option>
                    <option value="QuanTri">QuanTri</option>
                </select>

                <br />
                <button type="submit">Xac nhan</button>
                <button type="button" onClick={onCancel}>Huỷ</button>
            </form>
        </div>
    );
    }
