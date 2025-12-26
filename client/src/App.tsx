import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalogo from './pages/Catalogo';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      
      <div className="py-8">
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;