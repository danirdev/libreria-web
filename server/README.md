# Backend - Servidor API

API REST para la aplicación de librería construida con Node.js, Express y TypeScript.

## 📁 Estructura

```
src/
├── config/          # Configuraciones (base de datos, variables de entorno)
├── controllers/     # Controladores con lógica de negocio
├── middleware/      # Middlewares (errores, autenticación, etc.)
├── models/          # Modelos e interfaces TypeScript
├── routes/          # Definición de rutas
└── index.ts         # Punto de entrada de la aplicación
```

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

1. Copia el archivo `.env.example` y renómbralo a `.env`
2. Configura las variables de entorno:

```env
DATABASE_URL=postgresql://tu_usuario:tu_password@host/database
PORT=3000
NODE_ENV=development
```

## 🏃 Ejecución

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm start
```

## 📡 API Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:id` | Obtener producto por ID |
| POST | `/api/products` | Crear nuevo producto |
| PUT | `/api/products/:id` | Actualizar producto |
| DELETE | `/api/products/:id` | Eliminar producto |

### Ejemplo de Request (POST)

```json
{
  "nombre": "Cuaderno A4",
  "precio": 5.99,
  "categoria": "Papelería",
  "stock": 50,
  "imagen_url": "https://ejemplo.com/imagen.jpg"
}
```

## 🛠️ Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- CORS
- dotenv

## 📝 Scripts

- `npm run dev` - Modo desarrollo con hot reload (tsx)
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar build en producción
