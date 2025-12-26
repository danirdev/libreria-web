// filepath: d:\programacion\proyectos\proyecto-libreria\client\src\services\productoService.ts
import { api } from './api';
import type { Producto, CreateProductoDTO } from '../types/producto';

export const productoService = {
  // Obtener todos los productos
  getAll: () => api.get<Producto[]>('/products'),

  // Obtener un producto por ID
  getById: (id: number) => api.get<Producto>(`/products/${id}`),

  // Crear un nuevo producto
  create: (data: CreateProductoDTO) => api.post<Producto>('/products', data),

  // Actualizar un producto
  update: (id: number, data: CreateProductoDTO) => api.put<Producto>(`/products/${id}`, data),

  // Eliminar un producto
  delete: (id: number) => api.delete<{ message: string }>(`/products/${id}`),
};
