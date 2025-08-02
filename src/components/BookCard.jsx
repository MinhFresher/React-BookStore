import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'; 
import { toast } from "react-toastify";

import { addToCart } from '../redux/slices/cartSlice'; 
import "../styles/BookCard.css"

export default function BookCard ({ book }){
  const dispatch = useDispatch(); 

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    dispatch(addToCart(book));
    toast(`${book.tenSach} has been added to cart!`); 
  };
  
  const formatPriceWithDot = (price) => {
    return price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="book-card">
      <Link to={`/books/${book.maSach}`} style={{ textDecoration: 'none' }}>
        <img src={book.anhBia} alt={book.tenSach} />
      </Link>
      <div className="book-detail">
        <h4>{book.tenSach}</h4>

        <div className="book-status">
          <p>Status</p>
          <p className="status">
              {book.soLuongKho === 0 ? 'Out of Stock' : 'In Stock'}
          </p>
        </div>
          
        <div className="price-detail">
          <p>Price</p>
          <div className="prices">
            <p className="price-dis">{formatPriceWithDot(book.giaBan)}đ</p>
            <p className="price"> {formatPriceWithDot(book.giaNhap)}đ </p>
          </div>
        </div>

        <div className="book-action">
          <div className="book-link">
            <p>also available as:</p>
            <Link to="/store">All books</Link>
          </div>
          <button onClick={handleAddToCart}> ADD TO CART </button>
        </div>
      </div>
    </div>
  );
};