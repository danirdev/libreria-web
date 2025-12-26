import express from 'express';
import cors from 'cors';
import { config } from './config/environment.js';
import productoRoutes from './routes/producto.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '📚 API Librería - Servidor funcionando',
    version: '1.0.0',
    endpoints: {
      products: '/api/products'
    }
  });
});

// Rutas de la API
app.use('/api/products', productoRoutes);

// Manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

// Iniciar servidor
app.listen(config.port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${config.port}`);
  console.log(`📦 Entorno: ${config.nodeEnv}`);
});