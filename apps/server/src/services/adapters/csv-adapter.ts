import fs from 'fs/promises';
import path from 'path';
import type {
  Adapter,
  CircuitData,
  ConstructorData,
  DriverData,
  RaceData,
  SeasonData,
} from './base-adapter';

function resolveCsv(name: string) {
  return path.join(process.cwd(), 'apps', 'server', 'seeds', `${name}.csv`);
}

async function readCsv(file: string) {
  try {
    const content = await fs.readFile(file, 'utf8');
    const [headerLine, ...rows] = content.trim().split('\n');
    const headers = headerLine.split(',');
    return rows.map((row) => {
      const values = row.split(',');
      return headers.reduce<Record<string, string>>((acc, header, index) => {
        acc[header.trim()] = values[index]?.trim() ?? '';
        return acc;
      }, {});
    });
  } catch {
    return [];
  }
}

export class CsvAdapter implements Adapter {
  name = 'csv';

  async fetchSeasons(_range?: { start: number; end: number }): Promise<SeasonData[]> {
    const rows = await readCsv(resolveCsv('seasons'));
    return rows.map((row) => ({ year: Number(row.year), url: row.url }));
  }

  async fetchDrivers(): Promise<DriverData[]> {
    const rows = await readCsv(resolveCsv('drivers'));
    return rows.map((row) => ({
      driverId: row.driverId,
      code: row.code,
      givenName: row.givenName,
      familyName: row.familyName,
      dateOfBirth: row.dateOfBirth,
      nationality: row.nationality,
      url: row.url,
    }));
  }

  async fetchRaces(_range?: { start: number; end: number }): Promise<RaceData[]> {
    const rows = await readCsv(resolveCsv('races'));
    return rows.map((row) => ({
      raceId: row.raceId,
      year: Number(row.year),
      round: Number(row.round),
      name: row.name,
      date: row.date,
      circuitId: row.circuitId,
      url: row.url,
    }));
  }

  async fetchConstructors(): Promise<ConstructorData[]> {
    const rows = await readCsv(resolveCsv('constructors'));
    return rows.map((row) => ({
      constructorId: row.constructorId,
      name: row.name,
      nationality: row.nationality,
      url: row.url,
      color: row.color,
    }));
  }

  async fetchCircuits(): Promise<CircuitData[]> {
    const rows = await readCsv(resolveCsv('circuits'));
    return rows.map((row) => ({
      circuitId: row.circuitId,
      name: row.name,
      lat: Number(row.lat),
      lng: Number(row.lng),
      locality: row.locality,
      country: row.country,
      url: row.url,
    }));
  }
}
