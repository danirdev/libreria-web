import { Router } from 'express';
import { ProductoController } from '../controllers/producto.controller.js';
import { verifyToken } from '../middleware/auth.js'; // <--- Importar el guardia

const router = Router();

// Rutas Públicas (Cualquiera puede ver)
router.get('/', ProductoController.getAll);
router.get('/:id', ProductoController.getById);

// Rutas Privadas (Necesitan Token)
router.post('/', verifyToken, ProductoController.create); // <--- Protegida
router.put('/:id', verifyToken, ProductoController.update); // <--- Protegida
router.delete('/:id', verifyToken, ProductoController.delete); // <--- Protegida

export default router;
