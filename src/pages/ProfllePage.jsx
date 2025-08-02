import { Link, Outlet } from 'react-router-dom';

import "../styles/ProfilePage.css";
import HeaderStore from "../components/HeaderStore";
import Footer from "../components/Footer";

export default function ProfilePage() {
  return (
    <div className="profilepage">
        <HeaderStore/>
        <div className='main-content-user'>
          <nav>
              <Link to="/profilepage/userInfo">User Info</Link>
              <Link to="/profilepage/orderHistory">Order History</Link>
          </nav>

          <Outlet /> 
        </div>
        <Footer/>
    </div>
  );
}

