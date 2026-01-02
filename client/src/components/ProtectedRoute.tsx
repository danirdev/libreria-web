import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');

  // Si no hay token, redirigir a Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, mostrar el contenido (Outlet)
  return <Outlet />;
}
