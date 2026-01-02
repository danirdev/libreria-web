// filepath: client/src/pages/Catalogo.tsx
import { useEffect, useState } from 'react';
import { productoService } from '../services/productoService';
import type { Producto } from '../types/producto';
import ProductCard from '../components/ProductCard';
import { Search, Filter, X } from 'lucide-react'; // Iconos nuevos

// Las mismas categorías que usamos en el Admin
const CATEGORIAS = ['Todas', 'Papelería', 'Libros', 'Material Escolar', 'Oficina', 'Arte', 'Otros'];

export default function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- NUEVOS ESTADOS PARA FILTROS ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

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

  // --- LÓGICA DE FILTRADO ---
  // Se ejecuta cada vez que cambia el texto, la categoría o la lista de productos
  const filteredProducts = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || producto.categoria === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Función para limpiar filtros
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todas');
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando catálogo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center py-20">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={loadProductos}
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-screen">
      {/* --- ENCABEZADO Y FILTROS --- */}
      <div className="mb-8 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Nuestro Catálogo</h2>

        {/* Barra de Controles */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Buscador */}
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar mochila, cuaderno..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Filtro de Categorías (Botones tipo 'Pills') */}
          <div className="flex flex-wrap justify-center gap-2">
            <Filter size={20} className="text-gray-400 mr-2 self-center hidden md:block" />
            {CATEGORIAS.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- RESULTADOS --- */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-xl text-gray-500 mb-4">No encontramos productos con esos filtros.</p>
          <button onClick={clearFilters} className="text-blue-600 font-bold hover:underline">
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(producto => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}
