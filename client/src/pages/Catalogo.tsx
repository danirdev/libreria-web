// filepath: d:\programacion\proyectos\proyecto-libreria\client\src\pages\Catalogo.tsx
import { useEffect, useState } from 'react';
import { productoService } from '../services/productoService';
import type { Producto } from '../types/producto';
import ProductCard from '../components/ProductCard';

export default function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const data = await productoService.getAll();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center">
        <p className="text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={loadProductos}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Nuestro Catálogo
      </h2>
      
      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productos.map(producto => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}
