import { useEffect, useState } from "react";
import { toast } from "react-toastify"

import { getAllTacGia, deleteTacGia } from "../../services/authorService";
import TacGiaForm from "../../components/AuthorAdminForm";

export default function TacGiaManagement (){
    const [tacGia, setTacGia] = useState([]);
    const [selectedTacGia, setSelectedTacGia] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTacGia = tacGia.slice(startIndex, endIndex);

    const fetchTacGia = async () => {
        try {
        const data = await getAllTacGia();
        setTacGia(data);
        } catch (err) {
        console.error("❌ Failed to fetch tac gia:", err);
        }
    };

    useEffect (() => {
        fetchTacGia();
    }, []);

    const handleDelete = async (maTacGia) => {
        if (confirm("Xác nhận xoá tác giả?")) {
            await deleteTacGia(maTacGia);
            toast.success("✔️ Đã xoá tác giả");
            fetchTacGia();
        }
    };

    return(
        <div className="management-container">
            <h2 className="section-title">👥 Quản lý Tác giả</h2>

            <button onClick={() => { setSelectedTacGia(null); setShowForm(true); }}>Thêm mới</button>
            {showForm && (
                <TacGiaForm
                    tacgia={selectedTacGia}
                    onCancel={() => setShowForm(false)}
                    onUpdated={fetchTacGia}
                />
            )}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Mã Tác Giả</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Giới Thiệu</th>
                        <th>Ngày Tạo</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>

                <tbody>
                {paginatedTacGia.map((t) => (
                    <tr key={t.maTacGia}>
                        <td>{t.maTacGia}</td>
                        <td>{t.ten}</td>
                        <td>{t.email || "Chưa có"}</td>
                        <td>{t.gioiThieu || "Chưa có"}</td>
                        <td>{t.ngayTao}</td>
                        <td>
                        <button className="action-button edit-button" onClick={() => {setSelectedTacGia(t); setShowForm(true); }}>
                            Sửa
                        </button>
                        <button className="action-button delete-button" onClick={() => handleDelete(t.maTacGia)}>
                            Xoá
                        </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

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
                    disabled={endIndex >= tacGia.length}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Trang sau
                </button>
            </div>
        </div>
    )
}