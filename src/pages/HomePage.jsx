import { Link } from 'react-router-dom';

import "../styles/HomePage.css"
import Footer from '../components/Footer';

export default function HomePage (){
    const isLoggedIn = !!localStorage.getItem('token');

    return(
        <>
            <div className="header">
                <div className="h-task">
                    <p className="h-text">MEMBERSHIP</p>
                    <div className="h-box">
                        <p className="h-text">COUPONS & DEALS</p>
                    </div>
                    <p className="h-text">BEST SELLERS</p>
                </div>

                <div className="h-nav">
                    {isLoggedIn ? (
                    <Link to="profilepage">MY ACCOUNT</Link>
                    ) : (
                        <Link to="/login" className="navItem">
                            <img src="icon/account.png" alt="Login" />
                            <p>LOGIN</p>
                        </Link>
                    )}
                </div>         
            </div>

            <div className="h-menu">
                <img src="logo/logo.png" height={70}/>

                <Link to="/cart">
                    <div className="h-cart">
                        <p>Basket</p>
                        <img src="icon/cart.png" height={25} title='cart'/>
                    </div>
                </Link>
            </div>

            <div className="h-navigation">
                <Link to="/store">STORE</Link> 
                <a href="#top"> TOP BOOKS</a>
                <a href="#brand">BEST SELLER</a>
                <a href="#author">AUTHOR</a>
            </div>

            <div className="h-storeNav">
                <div
                    className="h-storeNav__bg"
                    style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url("ad/background2.png")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(6px)',
                    zIndex: -1,
                    }}
                />
                <p>Start your adventure journey by browsing Milions of books from our library</p>
                <Link to="/store"> Explore </Link>
            </div>

            <div className="h-topBooks" id='top'>
                <div className='h-topBook'>
                    <div className='h-action'>
                        <p>New Release</p>
                        <Link to="/store">Shop Now</Link>
                    </div>
                    <img src="bookImage/et1_0.png"/>
                </div>
                <div className='h-topBook' style={{backgroundColor:'#25a746ff'}}>
                    <div className='h-action'>
                        <p>Top Seller</p>
                        <Link to="/store">Shop Now</Link>
                    </div>
                    <img src="bookImage/mm_0.png"/>
                </div>
                <div className='h-topBook' style={{backgroundColor:'#c02f03ff'}}>
                    <div className='h-action'>
                        <p>Top Rated</p>
                        <Link to="/store">Shop Now</Link>
                    </div>
                    <img src="bookImage/cysec_0.png"/>
                </div>
            </div>

            <div className='h-ad'>
                <Link to="/store"> <img src="ad/adNav3.png" title='Go claim now'/> </Link>
            </div>

            <div className='h-topCat' id='brand'>
                <div className="topcatHeader"> 
                    <h1 style={{color: '#654a34',fontFamily: 'cursive'}}>Top Categories</h1>
                    <Link to="/store">SEE ALL+</Link>
                </div>
                <div className='topcatBooks'>
                    <div className='catBook'>
                        <img src="bookImage/frl1_0.png" />
                        <p>History</p>
                    </div>
                    <div className='catBook'>
                        <img src="bookImage/fsn1_0.png" />
                        <p>Legend</p>
                    </div>
                    <div className='catBook'>
                        <img src="bookImage/g_0.png" />
                        <p>Cooking</p>
                    </div>
                    <div className='catBook'>
                        <img src="bookImage/py_0.png" />
                        <p>Technology</p>
                    </div>
                </div>
            </div>

            <div className='h-ad'>
                <Link to="/store"> <img src="tacgia/ad.png" title='Go claim now'/> </Link>
            </div>

            <div className='h-author' id='author'> 
                <div className="topAuthorHeader"> 
                    <h1 style={{color: '#654a34',fontFamily: 'cursive'}}>Famous Authors</h1>
                    <Link to="/store">SEE ALL+</Link>
                </div>

                <div className='topAuthors'>
                    <div className='author'>
                        <img src="tacgia/Nasu.png" />
                        <p>Kinoko Nasu</p>
                    </div>
                    <div className='author'>
                        <img src="tacgia/Asato.png" />
                        <p>Asato Asato</p>
                    </div>
                    <div className='author'>
                        <img src="tacgia/gordon.png" />
                        <p>Gordon Ramsay</p>
                    </div>
                </div>
            </div>  
            <Footer/>
        </>
    )
}