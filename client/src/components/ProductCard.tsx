import { ShoppingCart } from 'lucide-react';
import type { Producto } from '../types/producto';
import { useCart } from '../context/CartContext'; // <--- Importar hook

interface Props {
  producto: Producto;
}

export default function ProductCard({ producto }: Props) {
  const { addToCart } = useCart(); // <--- Usamos el hook

  return (
    <div className="bg-white p-4 rounded shadow border hover:border-blue-500 transition flex flex-col h-full">
      <div className="h-48 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden relative group">
        {producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="w-full h-full object-cover transition transform group-hover:scale-110"
          />
        ) : (
          <span className="text-gray-400">Sin foto</span>
        )}
      </div>

      <div className="grow">
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wide">
          {producto.categoria}
        </span>
        <h3 className="font-bold text-lg text-gray-800 mt-2">{producto.nombre}</h3>
        {/* Si quieres mostrar stock: */}
        {producto.stock !== undefined && producto.stock <= 0 && (
          <span className="text-xs text-red-500 font-bold">Sin Stock</span>
        )}
      </div>

      <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-2xl font-bold text-green-600">
          ${Number(producto.precio).toLocaleString('es-AR')}
        </span>

        <button
          onClick={() => addToCart(producto)} // <--- Acción mágica
          disabled={producto.stock !== undefined && producto.stock <= 0}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed active:scale-95"
          title="Agregar al carrito"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
}
