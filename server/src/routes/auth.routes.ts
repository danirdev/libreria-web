import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res) => {
  const { password } = req.body;

  // Verificamos contra la variable de entorno
  if (password === process.env.ADMIN_PASSWORD) {
    // Creamos el token (expira en 24 horas)
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '24h',
    });

    return res.json({ token });
  }

  return res.status(401).json({ message: 'Contraseña incorrecta' });
});

export default router;
