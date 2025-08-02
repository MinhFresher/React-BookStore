import { useEffect, useState } from "react";
import { getOrdersByUser } from "../services/orderService";
import { getChiTietByDonHang } from "../services/orderDetailService";
import { Link } from 'react-router-dom';

export default function OrderHistory () {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;
    const [orderDetails, setOrderDetails] = useState({});
    const [activeOrderId, setActiveOrderId] = useState(null);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchDetails = async (maDonHang) => {
        try {
        const details = await getChiTietByDonHang(maDonHang);
        setOrderDetails((prev) => ({ ...prev, [maDonHang]: details }));
        setActiveOrderId(maDonHang);
        } catch (err) {
        console.error("Failed to fetch order details:", err);
        }
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem("maNguoiDung");
        console.log("🔍 Retrieved userId in Checkout:", storedUserId);

        if (storedUserId) {
            setUserId(Number(storedUserId)); //  ensure it's a number
        } else {
            console.warn("❗ No userId found in localStorage.");
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                console.log("Fetching orders for maNguoiDung:", userId);
                const res = await getOrdersByUser(userId); 
                console.log("Response from backend:", res);
                setOrders(res);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
            }
        };
        if (userId) fetchOrders(); 
    }, [userId]);

    return (
        <div className="order-history">
            <h2>🧾 My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <>
                    <div className="order-list">
                        {currentOrders.map((order) => (
                            <div key={order.maDonHang} className="order-item">
                                <p>Order Date: {order.ngayTao}</p>
                                <Link to={`/profilepage/orderDetail/${order.maDonHang}`} >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`page-button ${currentPage === page ? 'active' : ''}`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}