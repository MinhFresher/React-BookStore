import { useEffect, useState } from "react";
import { toast } from "react-toastify"

import { getAllNguoiDung, deleteNguoiDung } from "../../services/userService";
import UserAdminForm from "../../components/UserAdminForm";
import CreateUserForm from "../../components/CreateUserForm";
import "../../styles/AdminManagement.css";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [showForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex);
    
    const fetchUsers = async () => {
        try {
        const data = await getAllNguoiDung();
        setUsers(data);
        } catch (err) {
        console.error("❌ Failed to fetch users:", err);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Bạn có chắc muốn xoá người dùng này?")) {
            try {
            await deleteNguoiDung(id);
            toast.success("Đã xoá người dùng");
            fetchUsers(); // refresh data
            } catch (err) {
            console.error("❌ Xoá thất bại:", err);
            toast.error("Xoá thất bại");
            }
        }
    };

    return (
        <div className="management-container">
            <h2 className="section-title">👥 Quản lý người dùng</h2>
            <button className="create-button" onClick={() => { setSelectedUser(null); setShowForm(true); }}>Thêm mới</button>
            {showForm && (
                <CreateUserForm
                    user={null}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Tên đăng nhập</th>
                        <th>Email</th>
                        <th>SĐT</th>
                        <th>Địa chỉ</th>
                        <th>Vai trò</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.map((u) => (
                        <tr key={u.maNguoiDung}>
                            <td>{u.tenDangNhap}</td>
                            <td>{u.email}</td>
                            <td>{u.soDienThoai || "Chưa có"}</td>
                            <td>{u.diaChi || "Chưa có"}</td>
                            <td>{u.vaiTro}</td>
                            <td>
                                <button className="action-button edit-button"  onClick={() => setSelectedUser(u)}>
                                    Sửa
                                </button>
                                <button className="action-button delete-button" onClick={() => handleDelete(u.maNguoiDung)}>
                                    Xoá
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <UserAdminForm
                user={selectedUser}
                onCancel={() => setSelectedUser(null)}
                onUpdated={fetchUsers}
                />
            )}

            <div className="pagination">
                <button
                    className="pagination-button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                >
                    Trang trước
                </button>

                <span className="pagination-info">Trang {currentPage}</span>
                
                <button
                    className="pagination-button"
                    disabled={endIndex >= users.length}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
}
