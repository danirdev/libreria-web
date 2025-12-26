# 📚 Proyecto Librería

Aplicación web fullstack para la gestión de una librería online con React + TypeScript (Frontend) y Node.js + Express + PostgreSQL (Backend).

## 🏗️ Estructura del Proyecto

```
proyecto-libreria/
├── client/                 # Frontend (React + Vite + TypeScript)
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas principales
│   │   ├── services/      # Servicios API
│   │   ├── types/         # Tipos TypeScript
│   │   ├── App.tsx        # Componente principal
│   │   └── main.tsx       # Punto de entrada
│   └── package.json
│
└── server/                # Backend (Node.js + Express + PostgreSQL)
    ├── src/
    │   ├── config/        # Configuraciones (DB, env)
    │   ├── controllers/   # Lógica de negocio
    │   ├── middleware/    # Middlewares
    │   ├── models/        # Modelos/Interfaces
    │   ├── routes/        # Rutas de la API
    │   └── index.ts       # Punto de entrada
    └── package.json
```

## 🚀 Instalación

### Backend
```bash
cd server
npm install
```

### Frontend
```bash
cd client
npm install
```

## ⚙️ Configuración

### Variables de Entorno (Backend)

Crea un archivo `.env` en la carpeta `server/`:

```env
DATABASE_URL=postgresql://usuario:password@host/database
PORT=3000
NODE_ENV=development
```

## 🏃‍♂️ Ejecución

### Desarrollo

**Backend:**
```bash
cd server
npm run dev
```
El servidor estará en `http://localhost:3000`

**Frontend:**
```bash
cd client
npm run dev
```
La aplicación estará en `http://localhost:5173`

### Producción

**Backend:**
```bash
cd server
npm run build
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## 📡 Endpoints de la API

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto por ID
- `POST /api/products` - Crear un nuevo producto
- `PUT /api/products/:id` - Actualizar un producto
- `DELETE /api/products/:id` - Eliminar un producto

### Ejemplo de Producto (JSON)

```json
{
  "id": 1,
  "nombre": "Cuaderno A4",
  "precio": 5.99,
  "categoria": "Papelería",
  "stock": 50,
  "imagen_url": "https://ejemplo.com/imagen.jpg"
}
```

## 🛠️ Stack Tecnológico

### Frontend
- ⚛️ React 19
- 📘 TypeScript
- 🎨 Tailwind CSS 4.1
- 🚦 React Router DOM
- ⚡ Vite

### Backend
- 🟢 Node.js
- 🚂 Express
- 📘 TypeScript
- 🐘 PostgreSQL (Neon)
- 🔗 CORS

## 📝 Scripts Disponibles

### Server
- `npm run dev` - Modo desarrollo con hot-reload
- `npm run build` - Compilar TypeScript
- `npm start` - Ejecutar en producción

### Client
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Linter

## 🎯 Características

- ✅ CRUD completo de productos
- ✅ Interfaz responsiva con Tailwind
- ✅ Tipado estático con TypeScript
- ✅ Arquitectura limpia y modular
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ API RESTful

## 📦 Próximas Mejoras

- [ ] Autenticación de usuarios
- [ ] Carrito de compras
- [ ] Búsqueda y filtros
- [ ] Paginación
- [ ] Subida de imágenes
- [ ] Tests unitarios e integración
- [ ] Documentación con Swagger

## 👨‍💻 Desarrollo

Este proyecto está estructurado siguiendo las mejores prácticas de desarrollo web moderno con separación clara de responsabilidades.

---

**Licencia:** ISC
