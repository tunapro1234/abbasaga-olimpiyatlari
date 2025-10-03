import { Pool } from 'pg';
import config from './config';

const pool = new Pool({ connectionString: config.db.connectionString });

export async function runMigrations(): Promise<void> {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await pool.query(createTableSQL);
}

export async function getDbHealth(): Promise<'ok'> {
  await pool.query('SELECT 1');
  return 'ok';
}

export async function listUsers(): Promise<Array<{ id: number; email: string }>> {
  const result = await pool.query('SELECT id, email FROM users ORDER BY id ASC LIMIT 25');
  return result.rows.map((row) => ({ id: row.id, email: row.email }));
}

export async function seedDefaultUser(): Promise<void> {
  await pool.query(
    "INSERT INTO users (email) VALUES ($1) ON CONFLICT (email) DO NOTHING",
    ['sen@abbasaga.local']
  );
}

export default pool;
