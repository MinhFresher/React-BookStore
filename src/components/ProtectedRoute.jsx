import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRole }) {
  const vaiTro = localStorage.getItem('vaiTro');
  const token = localStorage.getItem('token');

  if (!token || vaiTro !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}