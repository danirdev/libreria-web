// filepath: d:\programacion\proyectos\proyecto-libreria\client\src\components\Navbar.tsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">📚 Librería Web</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Catálogo</Link>
          <Link 
            to="/admin" 
            className="bg-white text-blue-700 px-3 py-1 rounded font-bold hover:bg-gray-100"
          >
            Panel Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
