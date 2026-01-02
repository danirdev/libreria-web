import { useState } from 'react';
import { ShoppingCart, X, Trash2, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartWidget() {
  const { cart, removeFromCart, total, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // TU NÚMERO DE TELÉFONO AQUÍ (Formato internacional sin +)
  const PHONE_NUMBER = '5493881234567';

  const handleWhatsAppClick = () => {
    if (cart.length === 0) return;

    // Construimos el mensaje
    let message = 'Hola! 👋 Me gustaría realizar el siguiente pedido:\n\n';
    cart.forEach(item => {
      message += `▪️ ${item.quantity}x ${item.nombre} - $${Number(item.precio) * item.quantity}\n`;
    });
    message += `\n*Total Estimado: $${total}*`;
    message += '\n\nMuchas gracias!';

    // Codificamos para URL y abrimos WhatsApp
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (cart.length === 0) return null; // No mostrar si está vacío

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botón Flotante (Burbuja) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2 transition transform hover:scale-105 animate-bounce-short"
        >
          <ShoppingCart size={24} />
          <span className="font-bold">{cart.length}</span>
        </button>
      )}

      {/* Modal / Panel del Carrito */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 md:w-96 overflow-hidden border border-gray-200">
          {/* Cabecera */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold flex items-center gap-2">
              <ShoppingCart size={20} /> Tu Pedido
            </h3>
            <button onClick={() => setIsOpen(false)} className="hover:text-blue-200">
              <X size={20} />
            </button>
          </div>

          {/* Lista de Items */}
          <div className="max-h-60 overflow-y-auto p-4 space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium text-sm text-gray-800">{item.nombre}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} x ${item.precio}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-700">
                    ${Number(item.precio) * item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pie: Total y Botón */}
          <div className="bg-gray-50 p-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-600">${total}</span>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition"
              >
                <MessageCircle size={20} /> Enviar Pedido por WhatsApp
              </button>

              <button
                onClick={clearCart}
                className="w-full text-gray-400 text-xs hover:text-red-500 underline"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
