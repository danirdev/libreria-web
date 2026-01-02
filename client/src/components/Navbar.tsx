// filepath: client/src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Home as HomeIcon, LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Nombre */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-700">
              <HomeIcon className="w-6 h-6" />
              <span>Librería Web</span>
            </Link>
          </div>

          {/* Enlaces */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition"
            >
              Inicio
            </Link>

            <Link
              to="/catalogo"
              className="flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-full font-bold transition"
            >
              <ShoppingBag size={18} />
              Tienda
            </Link>

            {/* Si hay token, mostramos Logout. Si no, nada (para que sea oculto) */}
            {token && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 font-medium ml-4"
                title="Cerrar Sesión"
              >
                <LogOut size={18} />
                <span className="hidden md:inline">Salir</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
