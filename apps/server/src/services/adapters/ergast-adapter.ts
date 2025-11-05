import axios from 'axios';
import Bottleneck from 'bottleneck';
import type { Adapter, DriverData, RaceData, SeasonData } from './base-adapter';

const limiter = new Bottleneck({ maxConcurrent: 2, minTime: 250 });

async function get<T>(url: string) {
  return limiter.schedule(async () => {
    const response = await axios.get(url, { headers: { 'User-Agent': 'f1-stats-suite' } });
    return response.data as T;
  });
}

export class ErgastAdapter implements Adapter {
  name = 'ergast';

  async fetchSeasons(range: { start: number; end: number }): Promise<SeasonData[]> {
    const seasons: SeasonData[] = [];
    for (let year = range.start; year <= range.end; year += 1) {
      seasons.push({ year, url: `https://ergast.com/api/f1/${year}.json` });
    }
    return seasons;
  }

  async fetchDrivers(): Promise<DriverData[]> {
    type ErgastDrivers = {
      MRData: {
        DriverTable: { Drivers: Array<Record<string, string>> };
      };
    };
    const data = await get<ErgastDrivers>('https://ergast.com/api/f1/drivers.json?limit=1000');
    return data.MRData.DriverTable.Drivers.map((driver) => ({
      driverId: driver.driverId,
      code: driver.code ?? driver.driverId.slice(0, 3).toUpperCase(),
      givenName: driver.givenName,
      familyName: driver.familyName,
      dateOfBirth: driver.dateOfBirth,
      nationality: driver.nationality,
      url: driver.url,
    }));
  }

  async fetchRaces(range: { start: number; end: number }): Promise<RaceData[]> {
    const races: RaceData[] = [];
    for (let year = range.start; year <= range.end; year += 1) {
      type ErgastRaces = {
        MRData: {
          RaceTable: { Races: Array<Record<string, unknown>> };
        };
      };
      const data = await get<ErgastRaces>(`https://ergast.com/api/f1/${year}.json?limit=100`);
      data.MRData.RaceTable.Races.forEach((race) => {
        races.push({
          raceId: `${year}-${race.round}`,
          year,
          round: Number(race.round),
          name: String(race.raceName),
          date: String(race.date),
          circuitId: String((race.Circuit as { circuitId: string }).circuitId),
          url: String(race.url),
        });
      });
    }
    return races;
  }
}
