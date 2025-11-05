import { z } from 'zod';

export const driverSchema = z.object({
  driverId: z.string(),
  code: z.string().min(1).max(3),
  number: z.string().optional(),
  givenName: z.string(),
  familyName: z.string(),
  dateOfBirth: z.string(),
  nationality: z.string(),
  url: z.string().url(),
  imageUrl: z.string().url().optional(),
});

export const constructorSchema = z.object({
  constructorId: z.string(),
  name: z.string(),
  nationality: z.string(),
  url: z.string().url(),
  color: z.string().optional(),
});

export const circuitSchema = z.object({
  circuitId: z.string(),
  name: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
    locality: z.string(),
    country: z.string(),
  }),
  url: z.string().url(),
});

export const seasonSchema = z.object({
  year: z.number(),
  url: z.string().url(),
});

export const raceSchema = z.object({
  raceId: z.string(),
  year: z.number(),
  round: z.number(),
  name: z.string(),
  date: z.string(),
  time: z.string().optional(),
  circuitId: z.string(),
  url: z.string().url(),
});

export const resultSchema = z.object({
  raceId: z.string(),
  driverId: z.string(),
  constructorId: z.string(),
  grid: z.number(),
  position: z.number().optional(),
  positionText: z.string(),
  points: z.number(),
  laps: z.number(),
  status: z.string(),
  time: z.number().optional(),
  fastestLap: z.number().optional(),
  fastestLapSpeed: z.number().optional(),
});

export const lapTimeSchema = z.object({
  raceId: z.string(),
  driverId: z.string(),
  lap: z.number(),
  position: z.number(),
  timeMs: z.number(),
});

export const pitStopSchema = z.object({
  raceId: z.string(),
  driverId: z.string(),
  stop: z.number(),
  lap: z.number(),
  timeMs: z.number(),
  durationMs: z.number(),
});

export const favoriteSchema = z.object({
  userId: z.string(),
  entityType: z.enum(['driver', 'constructor', 'race']),
  entityId: z.string(),
  createdAt: z.string(),
});

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  passwordHash: z.string(),
  roles: z.array(z.enum(['admin', 'user'])),
  createdAt: z.string(),
});

export type DriverDTO = z.infer<typeof driverSchema>;
export type ConstructorDTO = z.infer<typeof constructorSchema>;
export type CircuitDTO = z.infer<typeof circuitSchema>;
export type SeasonDTO = z.infer<typeof seasonSchema>;
export type RaceDTO = z.infer<typeof raceSchema>;
export type ResultDTO = z.infer<typeof resultSchema>;
export type LapTimeDTO = z.infer<typeof lapTimeSchema>;
export type PitStopDTO = z.infer<typeof pitStopSchema>;
export type FavoriteDTO = z.infer<typeof favoriteSchema>;
export type UserDTO = z.infer<typeof userSchema>;

export const driverStandingSchema = z.object({
  driverId: z.string(),
  points: z.number(),
  wins: z.number(),
  podiums: z.number(),
  averageFinish: z.number(),
  averageQualifying: z.number(),
});

export type DriverStandingDTO = z.infer<typeof driverStandingSchema>;

export const driverComparisonQuerySchema = z.object({
  driverA: z.string(),
  driverB: z.string(),
  range: z.string().optional(),
});

export type DriverComparisonQuery = z.infer<typeof driverComparisonQuerySchema>;

export const liveLapEventSchema = z.object({
  driverId: z.string(),
  lap: z.number(),
  timeMs: z.number(),
  sectorTimesMs: z.tuple([z.number(), z.number(), z.number()]),
});

export const livePositionEventSchema = z.object({
  order: z.array(z.string()),
});

export const livePitEventSchema = z.object({
  driverId: z.string(),
  lap: z.number(),
  durationMs: z.number(),
});

export type LiveLapEvent = z.infer<typeof liveLapEventSchema>;
export type LivePositionEvent = z.infer<typeof livePositionEventSchema>;
export type LivePitEvent = z.infer<typeof livePitEventSchema>;

export const paginationSchema = z.object({
  cursor: z.string().nullish(),
  limit: z.number().min(1).max(100).default(25),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
