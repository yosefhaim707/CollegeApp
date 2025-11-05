import type { Request, Response } from 'express';
import { getDriverStandings, listSeasons } from '../services/season-service';

export async function listSeasonsHandler(_req: Request, res: Response) {
  const seasons = await listSeasons();
  res.json({ data: seasons, updatedAt: new Date().toISOString(), source: 'mongo' });
}

export async function driverStandingsHandler(req: Request, res: Response) {
  const year = Number(req.params.year);
  const standings = await getDriverStandings(year);
  res.json({ data: standings, updatedAt: new Date().toISOString(), source: 'mongo' });
}
