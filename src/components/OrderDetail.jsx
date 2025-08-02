import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getChiTietByDonHang } from "../services/orderDetailService";

export default function OrderDetail () {
    const { maDonHang } = useParams();
    const [details, setDetails] = useState([]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await getChiTietByDonHang(maDonHang);
                setDetails(res);
            } catch (err) {
                console.error("❌ Error fetching order details:", err);
            }
        };

        if (maDonHang) fetchDetails();
    }, [maDonHang]);

    return (
        <div className="order-details">
            <h2>📦 Order #{maDonHang} Details</h2>
            {details.length === 0 ? (
                <p>Loading or no items found.</p>
            ) : (
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((item, index) => (
                            <tr key={item.maChiTietDonHang || index}>
                                <td>{item.tenSach}</td>
                                <td>{item.soLuong}</td>
                                <td>{item.giaBan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}