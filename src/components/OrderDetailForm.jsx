import "../styles/OrderDetail.css"

export default function DetailForm({ order, onCancel, orderDetails }) {
    return (
        <div className="overlay-detail">
            <div className="detail-container">
                <h3>Chi tiết đơn hàng #{order?.maDonHang}</h3>
                <table border="1" className="detail-table">
                    <thead>
                        <tr>
                            <th>Mã Chi Tiết Đơn</th>
                            <th>Mã Sách</th>
                            <th>Tên Sách</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Tổng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails?.map((ct) => (
                            <tr key={ct.maChiTietDon}>
                                <td>{ct.maChiTietDon}</td>
                                <td>{ct.maSach}</td>
                                <td>{ct.tenSach}</td>
                                <td>{ct.soLuong}</td>
                                <td>{ct.giaBan}</td>
                                <td>{ct.giaBan * ct.soLuong}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" onClick={onCancel}>Close</button>
            </div>
        </div>
    );
}
