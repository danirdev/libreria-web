import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Admin from './pages/Admin';
import Login from './pages/Login'; // <--- Importar Login
import ProtectedRoute from './components/ProtectedRoute'; // <--- Importar Protección

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Navbar />

      <div className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/login" element={<Login />} /> {/* Ruta pública de Login */}
          {/* GRUPO DE RUTAS PROTEGIDAS */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
