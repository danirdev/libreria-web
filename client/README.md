# Frontend - Cliente Web

Aplicación web de librería construida con React, TypeScript, Vite y Tailwind CSS.

## 📁 Estructura

```
src/
├── components/      # Componentes reutilizables
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── ProductForm.tsx
├── pages/          # Páginas de la aplicación
│   ├── Catalogo.tsx
│   └── Admin.tsx
├── services/       # Servicios para llamadas a la API
│   ├── api.ts
│   └── productoService.ts
├── types/          # Tipos e interfaces TypeScript
│   └── producto.ts
├── App.tsx         # Componente principal con rutas
├── main.tsx        # Punto de entrada
└── index.css       # Estilos globales (Tailwind)
```

## 🚀 Instalación

```bash
npm install
```

## 🏃 Ejecución

### Desarrollo
```bash
npm run dev
```
Abre [http://localhost:5173](http://localhost:5173)

### Build para Producción
```bash
npm run build
npm run preview
```

## 🎨 Características

- ✅ Catálogo de productos con diseño responsivo
- ✅ Panel de administración para crear productos
- ✅ Manejo de estado con React Hooks
- ✅ Peticiones HTTP con Fetch API
- ✅ Rutas con React Router DOM
- ✅ Estilos con Tailwind CSS 4.1
- ✅ TypeScript para tipado estático

## 🛠️ Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4.1
- React Router DOM

## 📝 Scripts

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Ejecutar ESLint

## 🌐 Rutas

- `/` - Catálogo de productos (página principal)
- `/admin` - Panel de administración

## 🔌 Conexión con Backend

La aplicación se conecta al backend en `http://localhost:3000/api`

Si necesitas cambiar la URL, edita el archivo `src/services/api.ts`:

```typescript
const API_URL = 'http://localhost:3000/api';
```
