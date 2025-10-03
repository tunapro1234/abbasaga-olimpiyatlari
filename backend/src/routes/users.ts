import type { Request, Response } from 'express';
import { listUsers } from '../db';

export async function listUsersController(_req: Request, res: Response): Promise<void> {
  try {
    const users = await listUsers();
    res.json({ items: users });
  } catch (error) {
    console.error('Failed to list users', error);
    res.status(500).json({ error: 'Unable to list users' });
  }
}
