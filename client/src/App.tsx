import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // <--- Importar Home
import Catalogo from './pages/Catalogo';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Navbar />

      {/* Quitamos el padding 'py-8' global para que el Hero de Home ocupe todo el ancho sin bordes */}
      <div className="grow">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Ahora Inicio es Home */}
          <Route path="/catalogo" element={<Catalogo />} /> {/* Catalogo tiene su propia ruta */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
