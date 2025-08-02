import { Link } from 'react-router-dom';
import "../styles/Header.css"

export default function HeaderStore (){
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");  
        window.location.href = "/login";  
    };

    return(
        <div className='Header'>
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
                                <img src="/icon/account.png" alt="Account" />
                                <p>MY ACCOUNT</p>
                                <img src="/icon/down-arrow.png" alt="Dropdown" />
                            </div>
                            <div className="dropdown-menu">
                                <Link to="/profilepage">Manage Profile</Link>
                                <Link to="/profilepage/orderHistory">Orders</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="navItem">
                            <img src="/icon/account.png" alt="Login" />
                            <p>LOGIN</p>
                        </Link>
                    )}
                    {'|'}
                    <div className='navItem'>
                        <img src="/icon/wishlist.png" />
                        <p>WISHLIST</p>
                    </div>
                </div>
            </div>

            <div className='subHeader'>
                <div className='logo'>
                    <Link to="/">
                        <img src="/logo/logo.png"/>
                    </Link>
                </div>
                <div className='searchBar'>
                    <input type="text" />
                    <img src="/icon/search.png"/>
                </div>
                <div className='cart'>
                    <img src="/icon/shopping-cart.png"  />
                    <Link to="/cart">Your Cart</Link>
                </div>
            </div>
        </div>
    )
}