// filepath: d:\programacion\proyectos\proyecto-libreria\client\src\types\producto.ts

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  stock?: number;
  imagen_url?: string | null;
}

export interface CreateProductoDTO {
  nombre: string;
  precio: number;
  categoria: string;
  stock?: number;
  imagen_url?: string;
}
