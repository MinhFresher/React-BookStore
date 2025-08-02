import { useState } from "react";

import UserManagement from "./UserManagement";
import BookManagement from "./BookManagement";
import TacGiaManagement from "./TacGiaManagament";
import OrderManagement from "./OrderManagement"
import ThanhToanManagement from "./PaymentManagement"
import NxbManagement from "./NxbManagement";
import TheLoaiManagement from "./TheLoaiManagement";
import Dashboard from "./DashBoard";
import "../../styles/Dashboard.css"

export default function AdminDashboard() {
  const [tab, setTab] = useState("dashboard");

  const renderTab = () => {
    switch (tab) {
      case "dashboard":
        return <Dashboard/>
      case "users":
        return <UserManagement />;
      case "books":
        return <BookManagement />;
      case "orders":
        return <OrderManagement />;
      case "payments":
        return <ThanhToanManagement/>;
      case "authors":
        return <TacGiaManagement/>
      case "publisher":
        return <NxbManagement/>
      case "theloai":
        return <TheLoaiManagement/>
      default:
        return <p>🔧 Select a tab</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-container">
        <div className="sidebar">
          <h2 className="dashboard-title">🛠️ Admin Dashboard</h2>
          <button
            onClick={() => setTab("dashboard")}
            className={`sidebar-button ${tab === "dashboard" ? "active" : ""}`}
          >
            <span>🏠</span> Dashboard
          </button>
          <button
            onClick={() => setTab("users")}
            className={`sidebar-button ${tab === "users" ? "active" : ""}`}
          >
            <span>👤</span> Users
          </button>
          <button
            onClick={() => setTab("books")}
            className={`sidebar-button ${tab === "books" ? "active" : ""}`}
          >
            <span>📚</span> Books
          </button>
          <button
            onClick={() => setTab("theloai")}
            className={`sidebar-button ${tab === "theloai" ? "active" : ""}`}
          >
            <span>📖</span> TheLoai
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`sidebar-button ${tab === "orders" ? "active" : ""}`}
          >
            <span>🧾</span> Orders
          </button>
          <button
            onClick={() => setTab("payments")}
            className={`sidebar-button ${tab === "payments" ? "active" : ""}`}
          >
            <span>💳</span> Payment
          </button>
          <button
            onClick={() => setTab("authors")}
            className={`sidebar-button ${tab === "authors" ? "active" : ""}`}
          >
            <span>✍️</span> TacGia
          </button>
          <button
            onClick={() => setTab("publisher")}
            className={`sidebar-button ${tab === "publisher" ? "active" : ""}`}
          >
            <span>🏢</span> NhaXuatBan
          </button>
        </div>
        <div className="main-content">
          <div className="content-wrapper">
            {renderTab()}
          </div>
        </div>
      </div>
    </div>
  );
}
