import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from "../services/orderService.js";
import { removeFromCart } from '../redux/slices/cartSlice';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

import HeaderStore from '../components/HeaderStore.jsx';
import PaymentQRModal from '../components/PaymentQR.jsx';
import Footer from "../components/Footer.jsx";
import "../styles/Checkout.css";

export default function CheckoutPage (){
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [userId, setUserId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("VISA");
    const [showQR, setShowQR] = useState(false);
    const [pendingOrderData, setPendingOrderData] = useState(null);
    
    const formatPriceWithDot = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    useEffect(() => {
        const storedUserId = localStorage.getItem("maNguoiDung");

        console.log("🔍 Retrieved userId in Checkout:", storedUserId);

        if (storedUserId) {
            setUserId(storedUserId);  
        } else {
            console.warn("❗ No userId found in localStorage.");
        }
    }, []);

    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        email: "",
        address: "",
    });

    const totalAmount = cartItems.reduce((total, item) => {
        const price = Number(item.giaBan) || 0;
        const quantity = Number(item.quantity) || 0;
        return total + price * quantity;
    }, 0);
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setCustomerInfo((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePlaceOrder = async () => {
        if (!customerInfo.name || !customerInfo.email || !customerInfo.address) {
            alert("❗Please fill in all details.");
            return;
        }

        const orderData = {
            maNguoiDung: userId, 
            diaChi: customerInfo.address.trim(),
            hoTen: customerInfo.name,
            email: customerInfo.email,
            chiTietDonHangList: cartItems.map((item) => ({
                maSach: item.maSach,
                tenSach: item.tenSach,
                soLuong: item.quantity,
                giaBan: item.giaBan,
            })),
            tongTien: totalAmount,
            thanhToan: {
                phuongThuc: paymentMethod,
                soTien: totalAmount, 
            }
        };

        if (paymentMethod === "MOMO") {
            setPendingOrderData(orderData);
            setShowQR(true);
        } else {
            submitOrder(orderData);
        }
    };
    
    const submitOrder = async (orderData) => {
        try {
            const response = await createOrder(orderData);
            toast("🎉 Order placed successfully!");
            cartItems.forEach((item) => dispatch(removeFromCart(item.maSach)));
            console.log("✅ Order response:", response);
        } catch (error) {
            console.error("❌ Error creating order:", error);
            alert("❌ Order failed! Please try again.");
        }
    };

    if (!cartItems) {
        console.error("❌ Cart Items are undefined!");
        return <p>Error: No cart items found!</p>;
    }

    if (cartItems.length === 0) {
        console.warn("⚠️ Cart is empty!");
        return <p>Your cart is empty</p>;
    }

    return (
        <div className="body">
            <HeaderStore />

            <h1>Checkout</h1>
            <div className="checkout-content">
                <div className="customer-info">
                    <div className="checkout-details">
                        <h2>Người đặt hàng</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={customerInfo.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={customerInfo.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="deliver-info">
                        <div className="deliver">
                            <input 
                                type="radio" 
                            />
                            <label htmlFor="delivery"> Giao hàng tận nơi</label>

                            <input 
                                type="radio" 
                            />
                            <label htmlFor="pickup"> Nhận tại cửa hàng</label>
                        </div>

                        <input
                            className="address"
                            type="text"
                            name="address"
                            placeholder="Shipping Address"
                            value={customerInfo.address}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="payment-method">
                        <select
                            name="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="VISA">VISA</option>
                            <option value="MOMO">MOMO</option>
                        </select>
                    </div>
                </div>

                <div className="checkout-form">
                    <div className="summary">
                        <h2>Order Summary</h2>
                        {cartItems.map((item) => (
                            <p key={item.maSach}>
                                {item.tenSach} x {item.quantity} = {formatPriceWithDot(item.giaBan * item.quantity)} đ
                            </p>
                        ))}
                        <h3>Total: {formatPriceWithDot(totalAmount)}đ</h3>

                        <button className="place-order-btn" onClick={handlePlaceOrder}>
                            Check out
                        </button>
                    </div>
                </div>
            </div>
            
            <Footer/>
            {showQR && (
                <PaymentQRModal
                    totalAmount={totalAmount}
                    onClose={() => {
                        setShowQR(false);
                        submitOrder(pendingOrderData);
                    }}
                />
            )}
        </div>
    );
};

