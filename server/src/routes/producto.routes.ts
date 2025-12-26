// filepath: d:\programacion\proyectos\proyecto-libreria\server\src\routes\producto.routes.ts
import { Router } from 'express';
import { ProductoController } from '../controllers/producto.controller.js';

const router = Router();

// GET /api/products - Obtener todos los productos
router.get('/', ProductoController.getAll);

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', ProductoController.getById);

// POST /api/products - Crear un nuevo producto
router.post('/', ProductoController.create);

// PUT /api/products/:id - Actualizar un producto
router.put('/:id', ProductoController.update);

// DELETE /api/products/:id - Eliminar un producto
router.delete('/:id', ProductoController.delete);

export default router;
