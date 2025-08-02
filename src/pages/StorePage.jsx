import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "../styles/StorePage.css"
import { getAllBook, getBooksByTheLoai } from '../services/bookService';
import ProductCard from '../components/ProductCard';
import HeaderStore from '../components/HeaderStore';
import Footer from "../components/Footer"
import NavigationBar from '../components/NavigationBar';

export default function StorePage (){
    const [books, setBooks] = useState([]);
    const [booksByCategory, setBooksByCategory] = useState({});
    const carouselRefs = useRef({});

    const scrollLeft = (maTheLoai) => {
        const container = carouselRefs.current[maTheLoai];
        if (container) {
            const scrollAmount = container.offsetWidth;
            if (container.scrollLeft <= 0) {
                container.scrollLeft = container.scrollWidth;
            } else {
                container.scrollLeft -= scrollAmount;
            }
        }
    };
    const scrollRight = (maTheLoai) => {
        const container = carouselRefs.current[maTheLoai];
        if (container) {
            const scrollAmount = container.offsetWidth;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            if (container.scrollLeft >= maxScrollLeft) {
                container.scrollLeft = 0;
            } else {
                container.scrollLeft += scrollAmount;
            }
        }
    };

    const predefinedCategories = [
        { maTheLoai: 12, tenTheLoai: "Lịch sử" },
        { maTheLoai: 5, tenTheLoai: "Khoa học viễn tưởng" },
        { maTheLoai: 20, tenTheLoai: "Light novel" },
        { maTheLoai: 4, tenTheLoai: "Kinh dị"},
        { maTheLoai: 18, tenTheLoai: "Học tập" },
        { maTheLoai: 19, tenTheLoai: "Kĩ năng mềm" },
    ];

    useEffect(() => {
    const fetchBooksForCategories = async () => {
        const results = {};
        for (const category of predefinedCategories) {
            try {
                const res = await getBooksByTheLoai(category.maTheLoai);
                results[category.maTheLoai] = res.data;
            } catch (err) {
                console.error(`❌ Failed to fetch for ${category.tenTheLoai}:`, err);
            }
        }
        setBooksByCategory(results);
    };

    fetchBooksForCategories();
    }, []);

    useEffect(() => {
    getAllBook()
        .then(res => setBooks(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <>
            <HeaderStore/>
            <NavigationBar/>
            <div className='advertisment'>
                <img src="ad/ad0.png"/>
            </div>
            <div className='slogan'>
                <p>"Books hold the wisdom of thousands - all you need is the courage 
                    to open one!"</p>
            </div>
            <div className='advertisment'>
                <img src="ad/adNav0.png"/>
            </div>

            <div className='Store-title'>
                <p>The Book Store</p>
                <p className='quote'>
                    Discorver the beset books to read right now including trending titles
                    bookseller recommendations, new release and more.
                </p>
            </div>

            <div className='bookByCat'>
                {predefinedCategories.map((cat) => (
                    <div key={cat.maTheLoai}>
                        <div className='productbox-ad'>
                            <img src="ad/ad2.png"/>
                        </div>
                        <div className='product-box'>
                            <h2> {cat.tenTheLoai}</h2>
                            <Link to="">SEE ALL+</Link>
                        </div>
                        <div className="carousel-container">
                            <button className="carousel-button left" onClick={() => scrollLeft(cat.maTheLoai)}>
                                ‹
                            </button>
                            <button className="carousel-button right" onClick={() => scrollRight(cat.maTheLoai)}>
                                ›
                            </button>
                            <div className="carousel-track" ref={(el) => (carouselRefs.current[cat.maTheLoai] = el)}>
                                {booksByCategory[cat.maTheLoai]?.length > 0 ? (
                                    booksByCategory[cat.maTheLoai].map((book) => (
                                        <ProductCard key={book.maSach} book={book} />
                                    ))
                                ) : (
                                    <p>Không có sách trong thể loại này.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='advertisment'>
                <img src="ad/adNav1.png"/>
            </div>

            <div className='article-list'>
                <div className='article'>
                    <img src="ad/adBox.png" title='Buy it now' />
                </div>
                <div className='article'>
                    <img src="ad/seller.png" title='Buy it now' />
                </div>
                <div className='article'>
                    <img src="ad/seller1.png" title='Buy it now' />
                </div>
            </div>

            <div className='advertisment'>
                <img src="ad/adNav2.png"/>
            </div>

            <div className='best-book-list'>
                <div className='best-book'>
                    <img src="ad/adBox3.png" title='award' />
                    <div>
                        <p>The Best Books 2025 Award</p>
                    </div>
                </div>
                <div className='best-book'>
                    <img src="ad/adBox1.png" title='award' />
                    <div>
                        <p>The Biggest Books of Fall 2025: Fiction Edition</p>
                    </div>
                </div>
                <div className='best-book'>
                    <img src="ad/adBox2.png" title='award' />
                    <div>
                        <p>Braving the Blank Page: A Guest Post by Rory Power</p>
                    </div>
                </div>
            </div>

            <div className='advertisment'>
                <img src="ad/ad3.png"/>
            </div>

            <Footer/>
        </>
    )
}
