import { withCache } from '../config/redis';
import { LapTimeModel } from '../models/lap-time';
import { RaceModel } from '../models/race';

export function listRaces(year?: number) {
  const key = `races:list:${year ?? 'all'}`;
  return withCache(key, 120, () => {
    const filter = year ? { year } : {};
    return RaceModel.find(filter).sort({ date: 1 }).lean();
  });
}

export async function getRace(raceId: string) {
  const key = `race:${raceId}`;
  return withCache(key, 120, async () => {
    const race = await RaceModel.findOne({ raceId }).lean();
    if (!race) {
      throw { status: 404, message: 'Race not found' };
    }
    return race;
  });
}

export async function getLapChart(raceId: string, driverId?: string) {
  const key = `race:${raceId}:laps:${driverId ?? 'all'}`;
  return withCache(key, 60, async () => {
    const match = driverId ? { raceId, driverId } : { raceId };
    return LapTimeModel.find(match).sort({ lap: 1 }).lean();
  });
}
