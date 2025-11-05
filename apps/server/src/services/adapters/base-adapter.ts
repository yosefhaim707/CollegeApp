export interface SeasonData {
  year: number;
  url: string;
}

export interface DriverData {
  driverId: string;
  code: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
  url: string;
}

export interface RaceData {
  raceId: string;
  year: number;
  round: number;
  name: string;
  date: string;
  circuitId: string;
  url: string;
}

export interface ConstructorData {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
  color?: string;
}

export interface CircuitData {
  circuitId: string;
  name: string;
  lat: number;
  lng: number;
  locality: string;
  country: string;
  url: string;
}

export interface Adapter {
  name: string;
  fetchSeasons(range: { start: number; end: number }): Promise<SeasonData[]>;
  fetchDrivers(): Promise<DriverData[]>;
  fetchRaces(range: { start: number; end: number }): Promise<RaceData[]>;
  fetchConstructors?(): Promise<ConstructorData[]>;
  fetchCircuits?(): Promise<CircuitData[]>;
}
