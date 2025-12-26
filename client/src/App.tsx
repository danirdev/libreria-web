import { Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Admin from './Admin';

// Definición de tipos
interface Producto
{
  id: number;
  nombre: string;
  precio: number; // En el JSON viene como string, pero lo parsearemos
  categoria: string;
  imagen_url: string | null;
}

// Componente para la página de Inicio (Catálogo)
function Catalogo ()
{
  const [ productos, setProductos ] = useState<Producto[]>( [] );

  useEffect( () =>
  {
    fetch( 'http://localhost:3000/api/products' )
      .then( res => res.json() )
      .then( data => setProductos( data ) )
      .catch( err => console.error( err ) );
  }, [] );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Nuestro Catálogo</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        { productos.map( ( prod ) => (
          <div key={ prod.id } className="bg-white p-4 rounded shadow border hover:border-blue-500 transition">
            <div className="h-40 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
              { prod.imagen_url ? (
                <img src={ prod.imagen_url } alt={ prod.nombre } className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">Sin foto</span>
              ) }
            </div>
            <h3 className="font-bold text-lg">{ prod.nombre }</h3>
            <p className="text-sm text-gray-500">{ prod.categoria }</p>
            <p className="text-xl font-bold text-green-600 mt-2">${ Number( prod.precio ) }</p>
          </div>
        ) ) }
      </div>
    </div>
  );
}

// App Principal con Rutas
function App ()
{
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Barra de Navegación */ }
      <nav className="bg-blue-700 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">📚 Librería Web</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200">Catálogo</Link>
            <Link to="/admin" className="bg-white text-blue-700 px-3 py-1 rounded font-bold hover:bg-gray-100">Panel Admin</Link>
          </div>
        </div>
      </nav>

      {/* Aquí cambiamos de página según la URL */ }
      <div className="py-8">
        <Routes>
          <Route path="/" element={ <Catalogo /> } />
          <Route path="/admin" element={ <Admin /> } />
        </Routes>
      </div>
    </div>
  );
}

export default App;