import { useEffect, useState } from "react";
import { toast } from "react-toastify"

import { getAllBooks,deleteBook } from "../../services/bookService";
import { getAllTheLoai } from "../../services/categoryService";
import BookAdminForm from "../../components/BookAdminForm";
import "../../styles/AdminManagement.css";

export default function BookManagement (){
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [theLoaiList, setTheLoaiList] = useState([]);

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBooks = books.slice(startIndex, endIndex);

    const fetchBooks = async () => {
        try {
        const data = await getAllBooks();
        setBooks(data);
        } catch (err) {
        console.error("❌ Failed to fetch books:", err);
        }
    };

    const fetchTheLoai = async () => {
        const data = await getAllTheLoai(); 
        setTheLoaiList(data);
    };

    useEffect (() => {
        fetchBooks();
        fetchTheLoai();
    }, []);

    const handleDelete = async (maSach) => {
        if (confirm("Xác nhận xoá sách?")) {
            await deleteBook(maSach);
            toast.success("✔️ Đã xoá sách");
            fetchBooks();
        }
    };

    return(
        <div className="management-container">
            <h2 className="section-title">👥 Quản lý Sách</h2>

            <button className="create-button" onClick={() => { setSelectedBook(null); setShowForm(true); }}>Thêm sách mới</button>
            {showForm && (
                <BookAdminForm
                    book={selectedBook}
                    theLoaiList={theLoaiList}
                    onCancel={() => setShowForm(false)}
                    onUpdated={fetchBooks}
                />
            )}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Ảnh bìa</th>
                        <th>Tên Sách</th>
                        <th>Thể loại</th>
                        <th>Mô tả</th>
                        <th>Giá Nhập</th>
                        <th>Giá Bán</th>
                        <th>Số lượng kho</th>
                        <th>Mã tác giả</th>
                        <th>Ngày xuất bản</th>
                        <th>Mã NXB</th>
                        <th>Ngày Tạo</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>

                <tbody>
                {paginatedBooks.map((b) => (
                    <tr key={b.maSach}>
                        <td><img src={b.anhBia} style={{width: 100}}/></td>
                        <td>{b.tenSach || "Chưa có"}</td>
                        <td>
                            {b.theLoaiList.map((tl) => tl.tenTheLoai).join(", ") || "Chưa có"}
                        </td>
                        <td>{b.moTa || "Chưa có"}</td>
                        <td>{b.giaNhap}</td>
                        <td>{b.giaBan}</td>
                        <td>{b.soLuongKho || "Chưa có"}</td>
                        <td>{b.maTacGia || "Chưa có"}</td>
                        <td>{b.ngayXuatBan || "Chưa có"}</td>
                        <td>{b.maNXB}</td>
                        <td>{b.ngayTao}</td>
                        <td>
                        <button className="action-button edit-button" onClick={() => {setSelectedBook(b); setShowForm(true); }}>
                            Sửa
                        </button>
                        <button className="action-button delete-button" onClick={() => handleDelete(b.maSach)}>
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
                    disabled={endIndex >= books.length}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Trang sau
                </button>
            </div>
        </div>
    )
}