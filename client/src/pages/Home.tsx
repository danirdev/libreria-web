import { Link } from 'react-router-dom';
import { Printer, BookOpen, Send, MapPin, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* --- HERO SECTION (Bienvenida) --- */}
      <section className="bg-blue-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">Tu Centro de Copiado y Librería</h1>
          <p className="text-xl text-blue-100">
            Impresiones láser, anillados y los mejores útiles escolares en un solo lugar.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a
              href="https://wa.me/5493881234567" // ¡Pon tu número real aquí!
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition transform hover:scale-105"
            >
              <Send size={20} /> Enviar Archivos
            </a>
            <Link
              to="/catalogo"
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-full font-bold flex items-center gap-2 transition"
            >
              <BookOpen size={20} /> Ver Librería
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN DE SERVICIOS (Precios de referencia) --- */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nuestros Servicios</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <div className="bg-gray-50 p-8 rounded-xl border hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Printer size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Impresiones & Copias</h3>
              <p className="text-gray-600 mb-4">
                Blanco y negro o color. Papel obra, fotográfico y cartulina.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• B/N desde $50</li>
                <li>• Color desde $150</li>
                <li>• Oficio y A4</li>
              </ul>
            </div>

            {/* Tarjeta 2 */}
            <div className="bg-gray-50 p-8 rounded-xl border hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Encuadernación</h3>
              <p className="text-gray-600 mb-4">
                Anillados plásticos para tesis, apuntes y cuadernillos.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Tapas transparentes o color</li>
                <li>• Hasta 300 hojas</li>
                <li>• Entrega en el acto</li>
              </ul>
            </div>

            {/* Tarjeta 3 */}
            <div className="bg-gray-50 p-8 rounded-xl border hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <Send size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Trámites Digitales</h3>
              <p className="text-gray-600 mb-4">Escaneos, envíos de mail y descargas de boletas.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Escaneo a PDF</li>
                <li>• Turnos ANSES / AFIP</li>
                <li>• Descarga de apuntes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- INFO DE CONTACTO --- */}
      <section className="bg-gray-900 text-white py-12 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Librería Web</h2>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin size={18} /> Av. Siempre Viva 123, Jujuy
              </p>
              <p className="flex items-center gap-2">
                <Clock size={18} /> Lun a Vie: 8:00 - 13:00 / 17:00 - 21:00
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-lg font-semibold mb-2">¿Necesitas algo urgente?</p>
            <a href="tel:+5493881234567" className="text-2xl font-bold text-green-400">
              388-123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
