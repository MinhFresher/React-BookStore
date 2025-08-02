import { Link } from 'react-router-dom';

import "../styles/Footer.css";

export default function Footer (){
    return(
        <div className='f-body'>
            <div className='f-iconlist'>
                <div className='f-icon'>
                    <img src="icon/mobile.png"  />
                    <p>MOBILE APP</p>
                </div>
                <div className='f-icon'>
                    <img src="icon/blog.png"  />
                    <p>BLOG</p>
                </div>
                <div className='f-icon'>
                    <img src="icon/audioB.png"  />
                    <p>AUDIO BOOK</p>
                </div>
                <div className='f-icon'>
                    <img src="icon/podcast.png"  />
                    <p>PODCAST</p>
                </div>
                <div className='f-icon'>
                    <img src="icon/membership.png"  />
                    <p>MEMBERSHIP</p>
                </div>
                <div className='f-icon'>
                    <img src="icon/giftcard.png"  />
                    <p>GIFTCARDS</p>
                </div>
            </div>

            <div className='f-links'>
                <div className='linkBlock'>
                    <p className='linkTitle'>ABOUT US</p>
                    <Link >About L&P</Link>
                    <Link >Carrer at L&P</Link>
                </div>
                <div className='linkBlock'>
                    <p className='linkTitle'>SERVICE</p>
                    <Link >Publisher & Author</Link>
                    <Link >Order Discount</Link>
                    <Link >Mastercard</Link>
                    <Link >Membership</Link>
                </div>
                
                <div className='linkBlock'>
                    <p className='linkTitle'>QUICK HELP</p>
                    <Link >Shipping & Return</Link>
                    <Link >Store Pickup</Link>
                    <Link >Order Status</Link>
                    <Link >Gift Cards</Link>
                </div>
                
                <div className='linkBlock'>
                    <p className='linkTitle'>SHOP BY CATEGORY</p>
                    <Link >Books</Link>
                    <Link >History</Link>
                    <Link >Novel</Link>
                    <Link >Study</Link>
                </div>

                <div className='linkBlock'>
                    <p className='linkTitle'>FIND A STORE</p>
                    <div className='f-input'>
                        <input type="text" />
                        <img src="icon/right-arrow.png"  title='Find' />
                    </div>
                    <p className='linkTitle'>FOLLOW US</p>
                    <div className='f-social-list'>
                        <img src="icon/facebook.png"  />
                        <img src="icon/twitter.png"  />
                        <img src="icon/instar.png"  />
                        <img src="icon/tiktok.png"  />
                        <img src="icon/youtube.png"  />
                    </div>
                </div>
            </div>

            <div className='f-term'>
                <div className='termLink'>
                    <p>Terms of User</p>
                    <p>Copyright & Trademark</p>
                    <p>Privacy</p>
                    <p>Accessibility</p>
                    <p>Cookie Policy</p>
                    <p>Sitemap</p>
                </div>
                <div className='f-copyright'>
                    <p>
                        ©1997-2025 Barnes & Noble Booksellers, 
                        Inc. 33 East 17th Street, New York, NY 10003
                    </p>
                </div>
            </div>
        </div>
    )
}