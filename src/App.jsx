import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./components/ProtectedRoute";
import StorePage from "./pages/StorePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookDetailPage from "./pages/BookDetailPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfllePage";
import UserInfo from "./components/UserInfo";
import OrderHistory from "./components/OrderHistory";
import OrderDetail from "./components/OrderDetail"
import AdminDashboard from "./pages/admin/AdminDashboard";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import SciencePage from "./pages/SciencePage";
import LightNovelPage from "./pages/LightNovelPage";
import HorrorPage from "./pages/HororPage";
import LearningPage from "./pages/LearningPage";
import SoftSkillPage from "./pages/SoftSkillPage";

function App() {
  const vaiTro = localStorage.getItem("vaiTro"); 
  const isAdmin = vaiTro === "QuanTri";

  return (
    <BrowserRouter basename="/React-BookStore">
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/books/:id" element={<BookDetailPage />}/>
            <Route path="/store/history" element={<HistoryPage/>}/>
            <Route path="/store/science-fiction" element={<SciencePage/>}/>
            <Route path="/store/lightnovel" element={<LightNovelPage/>}/>
            <Route path="/store/horror" element={<HorrorPage/>}/>
            <Route path="/store/learning" element={<LearningPage/>}/>
            <Route path="/store/softskill" element={<SoftSkillPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/profilepage/*" element={<ProfilePage />}>
              <Route path="userInfo" element={<UserInfo />} />
              <Route path="orderHistory" element={<OrderHistory/>} />
              <Route path="orderDetail/:maDonHang" element={<OrderDetail />} />
            </Route>
            <Route element={<ProtectedRoute allowedRole="QuanTri" />}>
              <Route path="/admin" element={ <AdminDashboard />} />
            </Route>         
          </Routes>
      </Provider>
    </BrowserRouter>
  );
}
export default App;
