import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // <--- Importar
import CartWidget from './components/CartWidget'; // <--- Importar
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <CartProvider>
      {' '}
      {/* <--- 1. Envolvemos TODO con el Provider */}
      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <Navbar />
        <div className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Routes>
        </div>
        <CartWidget /> {/* <--- 2. Agregamos el Widget aquí */}
      </div>
    </CartProvider>
  );
}

export default App;
