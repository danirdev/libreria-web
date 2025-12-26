// filepath: d:\programacion\proyectos\proyecto-libreria\client\src\components\ProductForm.tsx
import { useState } from 'react';
import type { CreateProductoDTO } from '../types/producto';

interface ProductFormProps {
  onSubmit: (data: CreateProductoDTO) => Promise<void>;
  isLoading?: boolean;
}

const categorias = [
  'Papelería',
  'Libros',
  'Material Escolar',
  'Oficina',
  'Arte',
  'Otros'
];

export default function ProductForm({ onSubmit, isLoading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<CreateProductoDTO>({
    nombre: '',
    precio: 0,
    categoria: 'Papelería',
    stock: 0,
    imagen_url: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'precio' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    // Limpiar formulario después del submit exitoso
    setFormData({
      nombre: '',
      precio: 0,
      categoria: 'Papelería',
      stock: 0,
      imagen_url: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
      <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Producto</h2>

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre del Producto *
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Precio y Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio ($) *</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* URL de Imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
        <input
          type="url"
          name="imagen_url"
          value={formData.imagen_url}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Guardando...' : '✅ Agregar Producto'}
      </button>
    </form>
  );
}
