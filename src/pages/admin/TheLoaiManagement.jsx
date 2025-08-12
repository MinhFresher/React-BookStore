import { useEffect, useState } from "react";
import { toast } from "react-toastify"

import { getAllTheLoai, deleteTheLoai} from "../../services/categoryService";
import TheLoaiForm from "../../components/TheLoaiForm";

export default function TheLoaiManagement (){
    const [theLoai, setTheLoai] = useState([]);
    const [selectedTheLoai, setSelectedTheLoai] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTheLoai = theLoai.slice(startIndex, endIndex);

    const fetchTheLoai = async () => {
        try {
        const data = await getAllTheLoai();
        setTheLoai(data);
        } catch (err) {
        console.error("❌ Failed to fetch The Loai:", err);
        }
    };

    useEffect (() => {
        fetchTheLoai();
    }, []);

    const handleDelete = async (maTheLoai) => {
        if (confirm("Xác nhận xoá thể loại?")) {
            await deleteTheLoai(maTheLoai);
            toast.success("✔️ Đã xoá thể loại");
            fetchNhaXuatBan();
        }
    };

    return (
        <div className="management-container">
            <h2 className="section-title">👥 Quản lý Thể loại </h2>
            
            <button className="create-button" onClick={() => { setSelectedTheLoai(null); setShowForm(true); }}>Thêm mới</button>
            {showForm && (
                <TheLoaiForm
                    theloai={selectedTheLoai}
                    onCancel={() => setShowForm(false)}
                    onUpdated={fetchTheLoai}
                />
            )}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Mã Thể Loại</th>
                        <th>Tên Thể Loại</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                {paginatedTheLoai.map((tl) => (
                    <tr key={tl.maTheLoai}>
                        <td>{tl.maTheLoai}</td>
                        <td>{tl.tenTheLoai}</td>
                        <td>
                        <button className="action-button edit-button" onClick={() => {setSelectedTheLoai(tl); setShowForm(true); }}>
                            Sửa
                        </button>
                        <button className="action-button delete-button" onClick={() => handleDelete(tl.maTheLoai)}>
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
                    disabled={endIndex >= theLoai.length}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Trang sau
                </button>
            </div>
        </div>
    )
}