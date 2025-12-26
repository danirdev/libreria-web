// filepath: d:\programacion\proyectos\proyecto-libreria\server\src\config\database.ts
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Verificación de seguridad: Si no hay URL, no arrancamos
if (!process.env.DATABASE_URL) {
  throw new Error('❌ Error: Falta la variable DATABASE_URL en el archivo .env');
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('✅ Conectado a la Base de Datos en Neon (TS)');
});
