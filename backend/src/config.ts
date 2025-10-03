import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

type AppConfig = {
  env: string;
  port: number;
  host: string;
  db: {
    connectionString: string;
  };
  corsOrigins: string[];
};

function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable ${name}`);
  }
  return value;
}

const config: AppConfig = {
  env: process.env.NODE_ENV ?? 'development',
  port: Number(requireEnv('PORT', '3000')),
  host: requireEnv('HOST', '0.0.0.0'),
  db: {
    connectionString: requireEnv(
      'DATABASE_URL',
      'postgres://abbasaga:abbasaga@localhost:5432/abbasaga'
    )
  },
  corsOrigins: (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
};

export default config;
