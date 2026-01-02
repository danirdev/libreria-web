import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Producto } from '../types/producto';

// Definimos cómo se ve un item en el carrito (Producto + Cantidad)
export interface CartItem extends Producto {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Producto) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Producto) => {
    setCart(prev => {
      // ¿Ya existe el producto en el carrito?
      const existingItem = prev.find(item => item.id === product.id);

      if (existingItem) {
        // Si existe, le sumamos 1 a la cantidad
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Si no, lo agregamos con cantidad 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Calcular total automáticamente
  const total = cart.reduce((sum, item) => sum + Number(item.precio) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado para usar el carrito fácil
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};
