import type { Request, Response } from 'express';
import { listCircuits } from '../services/circuit-service';

export async function listCircuitsHandler(_req: Request, res: Response) {
  const data = await listCircuits();
  res.json({ data, updatedAt: new Date().toISOString(), source: 'mongo' });
}
