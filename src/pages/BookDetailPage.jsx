import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/bookService';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from "react-toastify"

import "../styles/BookDetailPage.css"
import HeaderStore from "../components/HeaderStore";
import Footer from "../components/Footer";
function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState();
  const dispatch = useDispatch();
  
  const handleAddToCart = (e) => {
    e.preventDefault(); 
    dispatch(addToCart(book));
    toast(`${book.tenSach} has been added to cart!`); 
  };

  useEffect(() => {
    getBookById(id)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const formatPriceWithDot = (price) => {
    return price
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  if (!book) return <p>Đang tải sách...</p>;

  return (
    <>
      <HeaderStore/>
      <div class="container">
        <div className='Book-describe'>
          <img src={book.anhBia} className='book-cover' />
          <div class="book-details">
            <h1 class="book-title">{book.tenSach}</h1>
            <p class="rating">★★★★★ 4.7 (166) <a href="#">Write A Review</a></p>
            <p class="price">{formatPriceWithDot(book.giaNhap)}đ <del>{formatPriceWithDot(book.giaBan)}đ</del> Save 20%</p>
            <button class="button" onClick={handleAddToCart}>ADD TO CART</button>
            <button class="button">FIND IN STORES</button>
          </div>
          <img src="ad/adBox.png" className='book-ad' />
        </div>

        <div class="overview">
          <h2>Overview</h2>
          <p>Được xuất bản vào: {book.ngayXuatBan}</p>
          <p>{book.moTa}</p>
          <p> Thể loại: {' '}
            {book.theLoaiList.map((item, index) => (
              <span key={index}>{item.tenTheLoai}{index < book.theLoaiList.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default BookDetailPage;
