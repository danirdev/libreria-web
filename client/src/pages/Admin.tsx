// filepath: d:\programacion\proyectos\proyecto-libreria\client\src\pages\Admin.tsx
import { useState } from 'react';
import { productoService } from '../services/productoService';
import type { CreateProductoDTO } from '../types/producto';
import ProductForm from '../components/ProductForm';

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (data: CreateProductoDTO) => {
    setIsLoading(true);
    setMessage(null);

    try {
      await productoService.create(data);
      setMessage({ type: 'success', text: '✅ Producto creado con éxito' });
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: '❌ Error al crear el producto' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel de Administración</h1>

      {/* Mensaje de feedback */}
      {message && (
        <div 
          className={`mb-4 p-4 rounded ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
