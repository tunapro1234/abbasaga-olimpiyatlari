import type { Request, Response } from 'express';
import { getDbHealth } from '../db';

export async function healthController(_req: Request, res: Response): Promise<void> {
  try {
    const dbStatus = await getDbHealth();
    res.json({ status: 'ok', db: dbStatus, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Health check failed', error);
    res.status(500).json({ status: 'error', message: 'Health check failed' });
  }
}
