// filepath: d:\programacion\proyectos\proyecto-libreria\client\src\components\ProductCard.tsx
import type { Producto } from '../types/producto';

interface ProductCardProps {
  producto: Producto;
}

export default function ProductCard({ producto }: ProductCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow border hover:border-blue-500 transition">
      <div className="h-40 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
        {producto.imagen_url ? (
          <img 
            src={producto.imagen_url} 
            alt={producto.nombre} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <span className="text-gray-400">Sin foto</span>
        )}
      </div>
      <h3 className="font-bold text-lg">{producto.nombre}</h3>
      <p className="text-sm text-gray-500">{producto.categoria}</p>
      <p className="text-xl font-bold text-green-600 mt-2">
        ${Number(producto.precio).toFixed(2)}
      </p>
      {producto.stock !== undefined && (
        <p className="text-xs text-gray-400 mt-1">Stock: {producto.stock}</p>
      )}
    </div>
  );
}
