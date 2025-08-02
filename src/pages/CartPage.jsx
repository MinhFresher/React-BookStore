import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import "../styles/CartPage.css"
import Footer from '../components/Footer';
export default function CartPage(){
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const formatPriceWithDot = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      toast.warning("⚠️ Vui lòng đăng nhập để tiếp tục thanh toán!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  return (
    
    <>
      <div style={{ padding: '2rem' }}>
        <div className="cart-container">
          <h1>🛒 Your Cart</h1>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>  
                  <th>Book Image</th>      
                  <th>Name</th>    
                  <th>Price</th>      
                  <th>Quanity</th>   
                  <th>Total</th>      
                  <th></th>     
                </tr>
              </thead>
              
              <tbody>
                {cartItems.map((item) => ( 
                  <tr key={item.maSach}>
                    <td>
                      <img 
                        src={item.anhBia} 
                        alt={item.tenSach}  
                      />
                    </td>
                    <td>{item.tenSach}</td>
                    <td>{formatPriceWithDot(item.giaBan)}d</td>
                    <td>
                      <button className="addminus" onClick={() => dispatch(decreaseQuantity(item.maSach))}>➖</button>
                      <span className="quantity">{item.quantity}</span>
                      <button className="addminus" onClick={() => dispatch(increaseQuantity(item.maSach))}>➕</button>
                    </td>
                    <td>{formatPriceWithDot((item.giaBan * item.quantity).toFixed(2))}d</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => dispatch(removeFromCart(item.maSach))}
                      >
                        <img src="/icon/bin.png" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {cartItems.length > 0 && (
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};


