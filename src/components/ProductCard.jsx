import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'; 
import { toast } from "react-toastify";

import { addToCart } from '../redux/slices/cartSlice'; 
import "../styles/ProductCard.css"

export default function ProductCard ({ book }){
  const dispatch = useDispatch(); 

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevents Link navigation when clicking cart icon
    dispatch(addToCart(book));
    toast(`${book.tenSach} has been added to cart!`); 
  };
  
  const formatPriceWithDot = (price) => {
    return price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="product-card">
      <Link to={`/books/${book.maSach}`} style={{ textDecoration: 'none' }}>
        <img src={book.anhBia} alt={book.tenSach} />
      </Link>
      <h4>{book.tenSach}</h4>
      <div className="describe">
        <div className="describe-detail">
          <p className="price-dis">{formatPriceWithDot(book.giaBan)}đ</p>
          <p className="price"> {formatPriceWithDot(book.giaNhap)}đ </p>
          <p className="status">
            {book.soLuongKho === 0 ? 'Out of Stock' : 'In Stock'}
          </p>
        </div>
        <img
          src="/icon/add-to-cart.png"
          title="add to cart"
          onClick={handleAddToCart} 
        />
      </div>
    </div>
  );
};

