import express, { Request, Response } from 'express';
import cors from 'cors';
import { pool } from './db.js'; // En Node con ESM, a veces se mantiene la extensión .js o se quita dependiendo de la config. Si te da error, prueba './db'

const app = express();
const PORT = process.env.PORT || 3000;

app.use( cors() );
app.use( express.json() );

// --- Interfaces (Tipos para tus datos) ---
// Esto asegura que sabemos qué forma tiene un producto dentro del Backend
interface Producto
{
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  // etc...
}

// --- RUTAS ---

app.get( '/', ( req: Request, res: Response ) =>
{
  res.send( '¡Servidor con TypeScript funcionando!' );
} );

app.get( '/api/products', async ( req: Request, res: Response ) =>
{
  try
  {
    // Le decimos a TS que la query devolverá algo con la forma de <Producto>
    const resultado = await pool.query<Producto>( 'SELECT * FROM productos' );
    res.json( resultado.rows );
  } catch ( error )
  {
    console.error( error );
    res.status( 500 ).json( { error: 'Error al obtener productos' } );
  }
} );

// Nueva ruta: Crear un producto
app.post( '/api/products', async ( req: Request, res: Response ) =>
{
  try
  {
    // 1. Desestructuramos los datos que vienen del Frontend (body)
    const { nombre, precio, categoria, stock, imagen_url } = req.body;

    // 2. Validación básica (TypeScript ayuda, pero siempre validamos datos externos)
    if ( !nombre || !precio )
    {
      res.status( 400 ).json( { error: 'El nombre y el precio son obligatorios' } );
      return; // Importante el return para detener la ejecución
    }

    // 3. Insertamos en la base de datos
    // El "RETURNING *" hace que Postgres nos devuelva el producto creado con su nuevo ID
    const query = `
      INSERT INTO productos (nombre, precio, categoria, stock, imagen_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [ nombre, precio, categoria, stock || 0, imagen_url || null ];

    const resultado = await pool.query<Producto>( query, values );

    // 4. Respondemos con el producto creado (Status 201 = Created)
    res.status( 201 ).json( resultado.rows[ 0 ] );

  } catch ( error )
  {
    console.error( error );
    res.status( 500 ).json( { error: 'Error al crear el producto' } );
  }
} );

app.listen( PORT, () =>
{
  console.log( `🚀 Servidor TS corriendo en http://localhost:${ PORT }` );
} );