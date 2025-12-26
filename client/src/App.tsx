import { useEffect, useState } from 'react';
import './index.css'; // Asegúrate de importar los estilos si no están en main.tsx

// 1. Definimos la "Interface": El contrato de cómo luce un producto
interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string; // Postgres suele devolver NUMERIC como string para no perder precisión
  categoria: string;
  stock: number;
  imagen_url: string | null; // Puede ser null si no tiene foto
}

function App() {
  // 2. Usamos el Generico <Producto[]> para decirle a useState qué va a guardar
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data: Producto[]) => { // Forzamos el tipo aquí
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        setCargando(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Librería & Fotocopias</h1>
        <p className="text-gray-600">Todo lo que necesitas para estudiar y trabajar</p>
      </header>

      {cargando ? (
        <p className="text-center text-xl">Cargando catálogo...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-blue-500">
              
              <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
                {producto.imagen_url ? (
                  <img src={producto.imagen_url} alt={producto.nombre} className="h-full w-full object-cover rounded" />
                ) : (
                  <span>Sin Imagen</span>
                )}
              </div>

              <h2 className="text-xl font-bold text-gray-800">{producto.nombre}</h2>
              <p className="text-sm text-gray-500 uppercase tracking-wide">{producto.categoria}</p>
              
              <div className="mt-4 flex justify-between items-center">
                {/* Convertimos el precio a Number para mostrarlo bonito con $ */}
                <span className="text-2xl font-bold text-green-600">
                  ${Number(producto.precio).toFixed(2)}
                </span>
                <button className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;