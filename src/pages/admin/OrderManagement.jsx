import { useEffect, useState } from "react";
import { toast } from "react-toastify"

import { getAllOrders, deleteOrder, updateOrder } from "../../services/orderService";
import { getChiTietByDonHang } from "../../services/orderDetailService";
import DetailForm from "../../components/OrderDetailForm";

export default function OrderManagement (){
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDetail, setShowDetail] = useState(false);
    const [updatedTrangThai, setUpdatedTrangThai] = useState({});

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedOrders = orders.slice(startIndex, endIndex);

    const fetchOrders = async () => {
        try {
        const data = await getAllOrders();
        setOrders(data);
        } catch (err) {
        console.error("❌ Failed to fetch orders:", err);
        }
    };

    useEffect (() => {
        fetchOrders();
    }, []);

    const handleViewDetails = async (order) => {
        setSelectedOrder(order);
        try {
            const data = await getChiTietByDonHang(order.maDonHang); // <-- you should have this API service
            setOrderDetails(data);
            setShowDetail(true);
        } catch (error) {
            toast.error("❌ Failed to fetch order details:", error);
        }
    };

    const handleDelete = async (maDonHang) => {
        if (confirm("Xac nhan xoa don hang?")) {
            await deleteOrder(maDonHang);
            toast.success(" Đã xoá don hang");
            fetchOrders();
        }
    };

    return(
        <div className="management-container">
            <h2 className="section-title">👥 Quản lý Don Hang</h2>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Mã Đơn Hàng</th>
                        <th>Mã Người dùng</th>
                        <th>Tổng Tiền</th>
                        <th>Trạng Thái</th>
                        <th>Ngày Tạo</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>

                <tbody>
                {paginatedOrders.map((order) => (
                    <tr key={order.maDonHang}>
                        <td>{order.maDonHang}</td>                
                        <td>{order.maNguoiDung|| "Chưa có"}</td>
                        <td>{order.tongTien}</td>
                        <td>
                            <select
                                value={updatedTrangThai[order.maDonHang] || order.trangThai}
                                onChange={async (e) => {
                                const newValue = e.target.value;
                                setUpdatedTrangThai((prev) => ({
                                    ...prev,
                                    [order.maDonHang]: newValue,
                                }));

                                try {
                                    await updateOrder(order.maDonHang, { trangThai: newValue });
                                    fetchOrders(); // Refresh data if needed
                                } catch (err) {
                                    console.error("❌ Cập nhật trạng thái thất bại:", err);
                                }
                                }}
                            >
                                <option value="ChoXacNhan">Chờ xác nhận</option>
                                <option value="DaThanhToan">Đã thanh toán</option>
                                <option value="DaGiao">Đã giao</option>
                            </select>
                        </td>
                        <td>{order.ngayTao}</td>
                        <td>
                            <button className="action-button edit-button" onClick={() => handleViewDetails(order)}>
                                Detail
                            </button>
                            <button className="action-button delete-button" onClick={() => handleDelete(order.maDonHang)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showDetail && (
                <DetailForm
                    order={selectedOrder}
                    orderDetails={orderDetails}
                    onCancel={() => setShowDetail(false)}
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
                    disabled={endIndex >= orders.length}
                    onClick={() => setCurrentPage((p) => p + 1)}
                >
                    Trang sau
                </button>
            </div>
        </div>
    )
}