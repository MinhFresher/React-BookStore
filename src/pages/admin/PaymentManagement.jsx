import { useEffect, useState } from "react";
import { toast } from "react-toastify"

import { getAllThanhToan, updateThanhToan } from "../../services/paymentService";

export default function ThanhToanManagement (){
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [updatedTrangThai, setUpdatedTrangThai] = useState({});

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPayments = payments.slice(startIndex, endIndex);

    const fetchPayments = async () => {
        try {
        const data = await getAllThanhToan();
        setPayments(data);
        } catch (err) {
        console.error("❌ Failed to fetch ThanhToan:", err);
        }
    };

    useEffect (() => {
        fetchPayments();
    }, []);

    return(
        <div className="management-container">
            <h2 className="section-title">👥 Quản lý Thanh Toán</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Mã Thanh Toán</th>
                        <th>Mã Đơn Hàng</th>
                        <th>Phương Thức</th>
                        <th>Trạng Thái</th>
                        <th>Ngày Thanh Toán</th>
                        <th>Loại Thanh Toán</th>
                        <th>Số Tiền</th>
                    </tr>
                </thead>

                <tbody>
                    {paginatedPayments.map((p) => (
                        <tr key={p.maThanhToan}>
                        <td>{p.maThanhToan}</td>
                        <td>{p.maDonHang}</td>
                        <td>{p.phuongThuc}</td>
                        <td>
                            <select
                                value={updatedTrangThai[p.maThanhToan] || p.trangThai}
                                onChange={async (e) => {
                                const newValue = e.target.value;
                                setUpdatedTrangThai((prev) => ({
                                    ...prev,
                                    [p.maThanhToan]: newValue,
                                }));

                                try {
                                    await updateThanhToan(p.maThanhToan, { trangThai: newValue });
                                    fetchPayments(); // Refresh data if needed
                                } catch (err) {
                                    console.error("❌ Cập nhật trạng thái thất bại:", err);
                                }
                                }}
                            >
                                <option value="Pending">Chờ xác nhận</option>
                                <option value="Complete">Đã thanh toán</option>
                            </select>
                        </td>
                        <td>{p.ngayThanhToan}</td>
                        <td>{p.loaiThanhToan}</td>
                        <td>{p.soTien}</td>
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
                    disabled={endIndex >payments.length}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Trang sau
                </button>
            </div>
        </div>
    )
}