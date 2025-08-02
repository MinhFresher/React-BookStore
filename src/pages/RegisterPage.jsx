import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { Link } from 'react-router-dom';

import "../styles/RegisterPage.css"

function RegisterPage() {
  const [form, setForm] = useState({ tenDangNhap: '', matKhau: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed!');
      console.error(err);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="logo-section">
          <div className="logo">📚</div>
          <h1 className="store-name">BookHaven</h1>
          <p className="tagline">Your Literary Journey Begins Here</p>
        </div>

        <div className="decorative-line"></div>

        <div>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <input name="tenDangNhap" placeholder="Tên đăng nhập" onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input name="matKhau" type="password" placeholder="Mật khẩu" onChange={handleChange} />
            <button type="submit">Register</button>
          </form>
        </div>

        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
