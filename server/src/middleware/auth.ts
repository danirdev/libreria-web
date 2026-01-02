import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // 1. Buscamos el token en la cabecera "Authorization"
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: '⛔ Acceso denegado. Falta el token.' });
  }

  try {
    // 2. Verificamos si el token es válido usando nuestra clave secreta
    // El token suele venir como "Bearer eyJhbGci...", así que a veces hay que limpiarlo,
    // pero para este ejemplo simple asumiremos que envías solo el token o "Bearer token"
    const tokenReal = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenReal, process.env.JWT_SECRET || 'secret');

    // 3. Si pasa, dejamos continuar la petición
    next();
  } catch (error) {
    return res.status(401).json({ message: '⛔ Token inválido o expirado.' });
  }
};
