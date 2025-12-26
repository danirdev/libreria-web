// filepath: d:\programacion\proyectos\proyecto-libreria\server\src\controllers\producto.controller.ts
import { Request, Response } from 'express';
import { pool } from '../config/database.js';
import { Producto, CreateProductoDTO } from '../models/producto.model.js';

export class ProductoController {
  
  // Obtener todos los productos
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const resultado = await pool.query<Producto>('SELECT * FROM productos');
      res.json(resultado.rows);
    } catch (error) {
      console.error('Error al obtener productos:', error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  // Crear un nuevo producto
  static async create(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, precio, categoria, stock, imagen_url }: CreateProductoDTO = req.body;

      // Validación básica
      if (!nombre || !precio) {
        res.status(400).json({ error: 'El nombre y el precio son obligatorios' });
        return;
      }

      // Insertar en la base de datos
      const query = `
        INSERT INTO productos (nombre, precio, categoria, stock, imagen_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;

      const values = [nombre, precio, categoria, stock || 0, imagen_url || null];
      const resultado = await pool.query<Producto>(query, values);

      res.status(201).json(resultado.rows[0]);
    } catch (error) {
      console.error('Error al crear producto:', error);
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  }

  // Obtener un producto por ID
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const resultado = await pool.query<Producto>(
        'SELECT * FROM productos WHERE id = $1',
        [id]
      );

      if (resultado.rows.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.json(resultado.rows[0]);
    } catch (error) {
      console.error('Error al obtener producto:', error);
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  }

  // Actualizar un producto
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nombre, precio, categoria, stock, imagen_url }: CreateProductoDTO = req.body;

      const query = `
        UPDATE productos 
        SET nombre = $1, precio = $2, categoria = $3, stock = $4, imagen_url = $5
        WHERE id = $6
        RETURNING *
      `;

      const values = [nombre, precio, categoria, stock || 0, imagen_url || null, id];
      const resultado = await pool.query<Producto>(query, values);

      if (resultado.rows.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.json(resultado.rows[0]);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  }

  // Eliminar un producto
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const resultado = await pool.query(
        'DELETE FROM productos WHERE id = $1 RETURNING *',
        [id]
      );

      if (resultado.rows.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
}
