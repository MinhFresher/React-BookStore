import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import UserManagement from "./UserManagement";
import BookManagement from "./BookManagement";
import TacGiaManagement from "./TacGiaManagament";
import OrderManagement from "./OrderManagement"
import ThanhToanManagement from "./PaymentManagement"
import NxbManagement from "./NxbManagement";
import TheLoaiManagement from "./TheLoaiManagement";
import ReportPage from "./Report";
import Dashboard from "./DashBoard";
import "../../styles/Dashboard.css"

export default function AdminDashboard() {
  const [tab, setTab] = useState("dashboard");
  const [vaiTro, setVaiTro] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('vaiTro');
    setVaiTro(userRole);
    if (userRole === 'NhanVien') {
      setTab("books"); 
    }
  }, []);

  const getAccessibleTabs = (role) => {
    if (role === 'QuanTri') {
      return [
        'dashboard', 'users', 'books', 'theloai', 'orders', 
        'payments', 'authors', 'publisher', 'report'
      ];
    } else if (role === 'NhanVien') {
      return ['dashboard','books', 'theloai', 'orders', 'authors', 'publisher'];
    }
    return [];
  };

  const accessibleTabs = getAccessibleTabs(vaiTro);

  const hasAccess = (tabName) => {
    return accessibleTabs.includes(tabName);
  };

  const renderTab = () => {
    if (!vaiTro) {
      return <div>Loading...</div>;
    }

    if (!hasAccess(tab)) {
      return console.error("You don't have permission to access this section!");;
    }

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
      case "report":
        return <ReportPage/>
      default:
        return <p>🔧 Select a tab</p>;
    }
  };
  
  if (!vaiTro) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-container">
        <div className="sidebar">
          <h2 className="dashboard-title">
            {vaiTro === 'QuanTri' ? 'Admin Dashboard' : 'NhanVien Dashboard'}
          </h2>

          {hasAccess('dashboard') && (
            <button
              onClick={() => setTab("dashboard")}
              className={`sidebar-button ${tab === "dashboard" ? "active" : ""}`}
            >
              <img src="icon/dashboard.png" height="30"/>
              Dashboard
            </button>
          )}

          {hasAccess('users') && (
            <button
              onClick={() => setTab("users")}
              className={`sidebar-button ${tab === "users" ? "active" : ""}`}
            >
              <img src="icon/users.png" height="30"/>
              Users
            </button>
          )}

          {hasAccess('books') && (
            <button
              onClick={() => setTab("books")}
              className={`sidebar-button ${tab === "books" ? "active" : ""}`}
            >
              <img src="icon/books.png" height="30"/>
              Books
            </button>
          )}

          {hasAccess('theloai') && (
            <button
              onClick={() => setTab("theloai")}
              className={`sidebar-button ${tab === "theloai" ? "active" : ""}`}
            >
              <img src="icon/category.png" height="30"/>
              Categories
            </button>
          )}

          {hasAccess('orders') && (
            <button
              onClick={() => setTab("orders")}
              className={`sidebar-button ${tab === "orders" ? "active" : ""}`}
            >
              <img src="icon/orders.png" height="30"/>
              Orders
            </button>
          )}

          {hasAccess('payments') && (
            <button
              onClick={() => setTab("payments")}
              className={`sidebar-button ${tab === "payments" ? "active" : ""}`}
            >
              <img src="icon/payment.png" height="30"/>
              Payment
            </button>
          )}

          {hasAccess('authors') && (
            <button
              onClick={() => setTab("authors")}
              className={`sidebar-button ${tab === "authors" ? "active" : ""}`}
            >
              <img src="icon/author.png" height="30"/>
              Author
            </button>
          )}

          {hasAccess('publisher') && (
            <button
              onClick={() => setTab("publisher")}
              className={`sidebar-button ${tab === "publisher" ? "active" : ""}`}
            >
              <img src="icon/publisher.png" height="30"/>
              Publisher
            </button>
          )}

          {hasAccess('report') && (
            <button
              onClick={() => setTab("report")}
              className={`sidebar-button ${tab === "report" ? "active" : ""}`}
            >
              <img src="icon/report.png" height="30"/>
              Report
            </button>
          )}
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
