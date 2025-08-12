import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllBook } from "../services/bookService";
import ProductCard from "../components/ProductCard";
import "../styles/SearchPage.css"
import Footer from "../components/Footer";

export default function SearchPage (){
    const [sach, setSach] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSach, setFilteredSach] = useState([]);
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");  
        window.location.href = "/#/login";  
    };

    useEffect(() => {
        const fetchSach = async () => {
            try {
                const { data } = await getAllBook();
                setSach(data);
            } catch (error) {
                console.error("❌ Error fetching Sachs:", error);
            }
        };

        fetchSach();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() !== "") {
            const results = sach.filter((s) =>
                (s.tenSach || "").toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSach(results);
        } else {
            setFilteredSach([]);
        }
    }, [searchTerm, sach]);

    return(
        <>
            <div className='mainHeader'>
                <div className='linkHeader'>
                    <Link>Store & Events</Link>{' | '}
                    <Link>Membership </Link>{' | '}
                    <Link>Read Blog</Link>{' | '}
                    <Link>Gift Cards</Link>
                </div>

                <div className='navHeader'>
                    {isLoggedIn ? (
                        <div className="account-dropdown">
                            <div className='navItem'>
                                <img src="icon/account.png" alt="Account" />
                                <p>MY ACCOUNT</p>
                                <img src="icon/down-arrow.png" alt="Dropdown" />
                            </div>
                            <div className="dropdown-menu">
                                <Link to="/profilepage">Manage Profile</Link>
                                <Link to="/profilepage/orderHistory">Orders</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="navItem">
                            <img src="icon/account.png" alt="Login" />
                            <p>LOGIN</p>
                        </Link>
                    )}
                    {'|'}
                    <div className='navItem'>
                        <img src="icon/wishlist.png" />
                        <p>WISHLIST</p>
                    </div>
                </div>
            </div>

            <div className="search-content">
                <div className='logo'>
                    <Link to="/">
                        <img className="Gif" src="logo/logo.png"/>
                    </Link>
                </div>
                <h2>Enter the book you want to find!</h2>

                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Enter the book name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="results-section">
                    {searchTerm && filteredSach.length === 0 && (
                        <p>No books found.</p>
                    )}

                    <div className="book-list">
                        {filteredSach.map((book) => (
                            <ProductCard key={book.maSach} book={book} />
                        ))}
                    </div>
                </div>

            </div>

            <Footer/>
        </>
    )
}