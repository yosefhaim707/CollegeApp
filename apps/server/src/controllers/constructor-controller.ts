import type { Request, Response } from 'express';
import { getConstructorProfile } from '../services/constructor-service';

export async function getConstructorHandler(req: Request, res: Response) {
  const data = await getConstructorProfile(req.params.constructorId);
  res.json({ data, updatedAt: new Date().toISOString(), source: 'mongo' });
}
