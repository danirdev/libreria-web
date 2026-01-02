import { Link } from 'react-router-dom';
import { ShoppingBag, Home as HomeIcon } from 'lucide-react'; // Usamos los iconos nuevos

export default function Navbar() {
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

            {/* Botón Admin discreto */}
            <Link
              to="/admin"
              className="text-gray-400 hover:text-gray-600 text-sm"
              title="Acceso Admin"
            >
              🔐
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
