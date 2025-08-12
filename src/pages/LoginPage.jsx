import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { login } from '../services/authService';
import "../styles/LoginPage.css";

export default function LoginPage() {
  const [form, setForm] = useState({ tenDangNhap: '', matKhau: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('maNguoiDung', res.data.maNguoiDung);
      localStorage.setItem('vaiTro', res.data.vaiTro);

      if (res.data.vaiTro === "QuanTri" || res.data.vaiTro === "NhanVien") {
        navigate("/admin");
      } else {
        navigate("/"); 
      }
    } catch (err) {
      alert('Login failed!');
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-section">
          <div className="logo">
              <img className='logo-login' src="logo/favicon-logo.png" />
          </div>
          <h1 className="store-name">Leaf & Spine</h1>
          <p className="tagline">Welcome Back to Your Literary World</p>
        </div>

        <div className="decorative-line"></div>

        <p className="welcome-text">Sign in to continue your reading journey</p>

        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input name="tenDangNhap" placeholder="Tên đăng nhập" onChange={handleChange} />
            <input name="matKhau" type="password" placeholder="Mật khẩu" onChange={handleChange} />
            <button type="submit">Login</button>
            <div>
              <p>Don't have account?</p>
              <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


