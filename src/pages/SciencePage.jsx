import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import "../styles/CatBookPage.css";
import HeaderStore from '../components/HeaderStore';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { getSachByTheLoai } from '../services/categoryService';
import BookCard from '../components/BookCard';

export default function SciencePage(){
    const definedCategory = {
        maTheLoai: 5, tenTheLoai: "Khoa học viễn tưởng"
    }
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 5;
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const totalPages = Math.ceil(books.length / booksPerPage);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                setError(null); 
                const response = await getSachByTheLoai(definedCategory.maTheLoai);
                setBooks(response); 
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [definedCategory.maTheLoai]);

    return(
        <>  
            <HeaderStore/>
            <NavigationBar/>
            <div className='advertisment'>
                <img src="/ad/ad0.png"/>
            </div>
            <div className='slogan'>
                <p>"Books hold the wisdom of thousands - all you need is the courage 
                    to open one!"</p>
            </div>
            <div className='advertisment'>
                <img src="/ad/adNav0.png"/>
            </div>

            <div className='Store-title'>
                <p>The Book Store</p>
                <p className='quote'>
                    Discorver the beset books to read right now including trending titles
                    bookseller recommendations, new release and more.
                </p>
            </div>

            <div className='main-content'>
                <div className='cat-nav'>
                    <div className='nav-item'>
                        <h3>CUSTOMER FAVORITES</h3>
                        <Link>Bestseller</Link>
                        <Link>New Releases</Link>
                        <Link>Comming soon</Link>
                        <Link>Books by subject</Link>
                    </div>
                    <div className='nav-item'>
                        <h3>SPECIAL VALUES</h3>
                        <Link>Bestseller 30% off</Link>
                        <Link>Book Limited Edition</Link>
                        <Link>Special Collections</Link>
                    </div>
                    <div className='nav-item'>
                        <h3>SUBJECT</h3>
                        <Link>Light Novel</Link>
                        <Link>Learning</Link>
                        <Link>Soft Skill</Link>
                        <Link>Horror</Link>
                    </div>
                    <div className='nav-item'>
                        <h3>PRICES</h3>
                        <Link>Bestseller</Link>
                        <Link>New Releases</Link>
                        <Link>Comming soon</Link>
                        <Link>Books by subject</Link>
                    </div>
                </div>

                <div className='cat-books'>
                    <img src="/ad/ad1.png" title='Buy this now!'/>
                    <div className='start-line'>
                        <p>Bestsellers</p>
                    </div>
                    <div className='category-book'>
                        {currentBooks.length > 0 ? (
                            currentBooks.map((book) => (
                                <BookCard key={book.maSach} book={book} />
                            ))
                        ) : (
                            <p>Không có sách trong thể loại này.</p>
                        )}
                    </div>

                    <div className='pagination'>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={pageNum === currentPage ? 'active' : ''}
                            >
                                {pageNum}
                            </button>
                        ))}

                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <div className='advertisment'>
                <img src="/ad/adNav3.png"/>
            </div>
            <Footer/>
        </>
    )
}