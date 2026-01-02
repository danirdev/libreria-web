import { useState, useEffect } from 'react';
import type { CreateProductoDTO, Producto } from '../types/producto';

interface ProductFormProps {
  onSubmit: (data: CreateProductoDTO) => Promise<void>;
  isLoading?: boolean;
  productToEdit?: Producto | null;
  onCancelEdit?: () => void;
}

const categorias = ['Papelería', 'Libros', 'Material Escolar', 'Oficina', 'Arte', 'Otros'];

// --- TUS DATOS DE CLOUDINARY AQUÍ ---
const CLOUD_NAME = 'dcf0uirdo'; // Ej: "ds87a..."
const UPLOAD_PRESET = 'libreria_preset'; // Ej: "libreria_preset"

const initialState: CreateProductoDTO = {
  nombre: '',
  precio: 0,
  categoria: 'Papelería',
  stock: 0,
  imagen_url: '',
};

export default function ProductForm({
  onSubmit,
  isLoading = false,
  productToEdit,
  onCancelEdit,
}: ProductFormProps) {
  const [formData, setFormData] = useState<CreateProductoDTO>(initialState);
  const [uploadingImage, setUploadingImage] = useState(false); // Estado para la carga de imagen

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        nombre: productToEdit.nombre,
        precio: Number(productToEdit.precio),
        categoria: productToEdit.categoria,
        stock: productToEdit.stock || 0,
        imagen_url: productToEdit.imagen_url || '',
      });
    } else {
      setFormData(initialState);
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as keyof CreateProductoDTO]:
        name === 'precio' || name === 'stock' ? Number(value) : value,
    }));
  };

  // --- FUNCIÓN PARA SUBIR A CLOUDINARY ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data,
      });

      const fileData = await res.json();

      if (fileData.secure_url) {
        // Guardamos la URL que nos devuelve Cloudinary
        setFormData(prev => ({ ...prev, imagen_url: fileData.secure_url }));
      }
    } catch (error) {
      console.error('Error subiendo imagen:', error);
      alert('Error al subir la imagen');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    if (!productToEdit) {
      setFormData(initialState);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md space-y-4 border-l-4 border-blue-500"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {productToEdit ? '✏️ Editando Producto' : '➕ Agregar Nuevo Producto'}
        </h2>

        {productToEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm text-red-600 hover:text-red-800 underline"
          >
            Cancelar Edición
          </button>
        )}
      </div>

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre del Producto *</label>
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
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* --- SECCIÓN DE IMAGEN ACTUALIZADA --- */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Imagen del Producto</label>

        {/* Previsualización */}
        {formData.imagen_url && (
          <div className="mt-2 mb-2 w-32 h-32 bg-gray-100 rounded border overflow-hidden">
            <img
              src={formData.imagen_url}
              alt="Vista previa"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex gap-2 items-center">
          {/* Input de archivo oculto + Botón personalizado o Input normal */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploadingImage}
            className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
          />
          {uploadingImage && (
            <span className="text-sm text-blue-600 animate-pulse">Subiendo...</span>
          )}
        </div>

        {/* Input oculto para que el form siga enviando la URL string */}
        <input type="hidden" name="imagen_url" value={formData.imagen_url} />
      </div>

      {/* Botón Submit */}
      <button
        type="submit"
        disabled={isLoading || uploadingImage} // Deshabilitar si se está subiendo foto
        className={`w-full text-white py-2 px-4 rounded font-bold transition
          ${productToEdit ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-600 hover:bg-blue-700'} 
          disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        {isLoading ? 'Procesando...' : productToEdit ? '💾 Guardar Cambios' : '✅ Guardar Producto'}
      </button>
    </form>
  );
}
