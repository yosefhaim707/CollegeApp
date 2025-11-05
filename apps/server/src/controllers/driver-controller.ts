import type { Request, Response } from 'express';
import { getDriverById, listDrivers } from '../services/driver-service';

export async function listDriversHandler(req: Request, res: Response) {
  const search = req.query.search?.toString();
  const drivers = await listDrivers(search);
  res.json({ data: drivers, updatedAt: new Date().toISOString(), source: 'mongo' });
}

export async function getDriverHandler(req: Request, res: Response) {
  const driver = await getDriverById(req.params.driverId);
  res.json({ data: driver, updatedAt: new Date().toISOString(), source: 'mongo' });
}
