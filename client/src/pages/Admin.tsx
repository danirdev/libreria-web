import { useState, useEffect } from 'react';
import { productoService } from '../services/productoService';
import type { Producto, CreateProductoDTO } from '../types/producto';
import ProductForm from '../components/ProductForm';

export default function Admin() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Estado para saber si estamos editando uno (si es null, estamos creando)
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 1. Cargar productos al iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productoService.getAll();
      // Ordenamos para ver los nuevos primero (por ID descendente)
      setProducts(data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error('Error cargando productos', error);
    }
  };

  // 2. Manejar el Guardado (Crear o Editar)
  const handleSubmit = async (data: CreateProductoDTO) => {
    setIsLoading(true);
    setMessage(null);

    try {
      if (editingProduct) {
        // --- MODO EDICIÓN ---
        await productoService.update(editingProduct.id, data);
        setMessage({ type: 'success', text: '✅ Producto actualizado correctamente' });
        setEditingProduct(null); // Salir del modo edición
      } else {
        // --- MODO CREACIÓN ---
        await productoService.create(data);
        setMessage({ type: 'success', text: '✅ Producto creado con éxito' });
      }

      await loadProducts(); // Recargar la tabla
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: '❌ Error al guardar el producto' });
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Manejar Borrado
  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      await productoService.delete(id);
      setMessage({ type: 'success', text: '🗑️ Producto eliminado' });
      loadProducts(); // Recargar la lista
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Error al eliminar' });
    }
  };

  // 4. Activar modo edición
  const handleEditClick = (product: Producto) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Subir para ver el form
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel de Administración</h1>

      {/* Mensajes de Feedback */}
      {message && (
        <div
          className={`mb-4 p-4 rounded text-center font-semibold ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Formulario (Funciona para Crear y Editar) */}
      <div className="mb-10">
        <ProductForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          productToEdit={editingProduct}
          onCancelEdit={handleCancelEdit}
        />
      </div>

      {/* Tabla de Gestión */}
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Inventario Actual ({products.length})
      </h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4">Imagen</th>
                <th className="p-4">Producto</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No hay productos registrados.
                  </td>
                </tr>
              ) : (
                products.map(prod => (
                  <tr key={prod.id} className="hover:bg-gray-50 transition">
                    <td className="p-3">
                      <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
                        {prod.imagen_url ? (
                          <img
                            src={prod.imagen_url}
                            alt={prod.nombre}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">Sin foto</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 font-medium text-gray-800">{prod.nombre}</td>
                    <td className="p-3 text-sm text-gray-500">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        {prod.categoria}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-green-600">${prod.precio}</td>
                    <td className="p-3 text-sm">
                      <span
                        className={`${
                          (prod.stock || 0) < 5 ? 'text-red-500 font-bold' : 'text-gray-600'
                        }`}
                      >
                        {prod.stock} u.
                      </span>
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEditClick(prod)}
                        className="bg-yellow-100 text-yellow-700 p-2 rounded hover:bg-yellow-200 transition"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="bg-red-100 text-red-700 p-2 rounded hover:bg-red-200 transition"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
