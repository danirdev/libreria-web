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

app.listen( PORT, () =>
{
  console.log( `🚀 Servidor TS corriendo en http://localhost:${ PORT }` );
} );