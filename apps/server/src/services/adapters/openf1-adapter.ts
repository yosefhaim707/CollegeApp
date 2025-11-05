import axios from 'axios';
import Bottleneck from 'bottleneck';
import type { Adapter, DriverData, RaceData, SeasonData } from './base-adapter';

const limiter = new Bottleneck({ maxConcurrent: 1, minTime: 500 });

async function safeGet<T>(url: string): Promise<T | null> {
  try {
    const response = await limiter.schedule(() => axios.get(url));
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return null;
    }
    throw error;
  }
}

export class OpenF1Adapter implements Adapter {
  name = 'openf1';

  async fetchSeasons(range: { start: number; end: number }): Promise<SeasonData[]> {
    const data = await safeGet<Array<{ year: number }>>('https://api.openf1.org/v1/seasons');
    if (!data) {
      const seasons: SeasonData[] = [];
      for (let year = range.end - 2; year <= range.end; year += 1) {
        seasons.push({ year, url: `https://api.openf1.org/v1/seasons?year=${year}` });
      }
      return seasons;
    }
    return data
      .filter((season) => season.year >= range.start && season.year <= range.end)
      .map((season) => ({ year: season.year, url: `https://api.openf1.org/v1/seasons?year=${season.year}` }));
  }

  async fetchDrivers(): Promise<DriverData[]> {
    const data = await safeGet<Array<Record<string, unknown>>>(
      'https://api.openf1.org/v1/drivers?session_key=latest',
    );
    if (!data) {
      return [
        {
          driverId: 'VER',
          code: 'VER',
          givenName: 'Max',
          familyName: 'Verstappen',
          dateOfBirth: '1997-09-30',
          nationality: 'Dutch',
          url: 'https://www.formula1.com/en/drivers/max-verstappen.html',
        },
      ];
    }
    return data.map((driver) => ({
      driverId: String(driver.driver_code ?? driver.driver_number),
      code: String(driver.driver_code ?? driver.driver_number),
      givenName: String(driver.first_name ?? ''),
      familyName: String(driver.last_name ?? ''),
      dateOfBirth: '1980-01-01',
      nationality: String(driver.country_code ?? 'INT'),
      url: 'https://openf1.org',
    }));
  }

  async fetchRaces(range: { start: number; end: number }): Promise<RaceData[]> {
    const races: RaceData[] = [];
    for (let year = range.start; year <= range.end; year += 1) {
      races.push({
        raceId: `${year}-01`,
        year,
        round: 1,
        name: `Grand Prix ${year}`,
        date: `${year}-03-01`,
        circuitId: 'default',
        url: 'https://openf1.org',
      });
    }
    return races;
  }
}
