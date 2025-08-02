import { useEffect, useState } from "react";
import { toast } from "react-toastify"

import { getAllNxb, deleteNxb } from "../../services/NxbService"
import NxbForm from "../../components/PublisherForm";

export default function NxbManagement (){
    const [nhaXuatBan, setNhaXuatBan] = useState([]);
    const [selectedNxb, setSelectedNxb] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNxb = nhaXuatBan.slice(startIndex, endIndex);

    const fetchNhaXuatBan = async () => {
        try {
        const data = await getAllNxb();
        setNhaXuatBan(data);
        } catch (err) {
        console.error("❌ Failed to fetch Nha xuat ban:", err);
        }
    };

    useEffect (() => {
        fetchNhaXuatBan();
    }, []);

    const handleDelete = async (maNXB) => {
        if (confirm("Xác nhận xoá nhà xuất bản?")) {
            await deleteNxb(maNXB);
            toast.success("✔️ Đã xoá nhà xuất bản");
            fetchNhaXuatBan();
        }
    };

    return(
        <div className="management-container">
            <h2 className="section-title">👥 Quản lý Nhà xuất bản</h2>

            <button className="create-button" onClick={() => { setSelectedNxb(null); setShowForm(true); }}>Thêm mới</button>
            {showForm && (
                <NxbForm
                    nxb={selectedNxb}
                    onCancel={() => setShowForm(false)}
                    onUpdated={fetchNhaXuatBan}
                />
            )}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Mã Nhà Xuất Bản</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Giới Thiệu</th>
                        <th>Ngày Tạo</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>

                <tbody>
                {paginatedNxb.map((n) => (
                    <tr key={n.maNXB}>
                        <td>{n.maNXB}</td>
                        <td>{n.tenNXB}</td>
                        <td>{n.email || "Chưa có"}</td>
                        <td>{n.gioiThieu || "Chưa có"}</td>
                        <td>{n.ngayTao}</td>
                        <td>
                        <button className="action-button edit-button" onClick={() => {setSelectedNxb(n); setShowForm(true); }}>
                            Sửa
                        </button>
                        <button className="action-button delete-button" onClick={() => handleDelete(n.maNXB)}>
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
                    disabled={endIndex >= nhaXuatBan.length}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Trang sau
                </button>
            </div>
        </div>
    )
}