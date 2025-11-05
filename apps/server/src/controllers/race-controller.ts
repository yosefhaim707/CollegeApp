import type { Request, Response } from 'express';
import { getLapChart, getRace, listRaces } from '../services/race-service';

export async function listRacesHandler(req: Request, res: Response) {
  const year = req.query.year ? Number(req.query.year) : undefined;
  const races = await listRaces(year);
  res.json({ data: races, updatedAt: new Date().toISOString(), source: 'mongo' });
}

export async function getRaceHandler(req: Request, res: Response) {
  const race = await getRace(req.params.raceId);
  res.json({ data: race, updatedAt: new Date().toISOString(), source: 'mongo' });
}

export async function getLapChartHandler(req: Request, res: Response) {
  const laps = await getLapChart(req.params.raceId, req.query.driverId?.toString());
  res.json({ data: laps, updatedAt: new Date().toISOString(), source: 'mongo' });
}
