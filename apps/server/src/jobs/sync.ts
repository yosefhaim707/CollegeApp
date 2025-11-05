import cron from 'node-cron';
import { logger } from '../config/logger';
import { SeasonModel } from '../models/season';
import { DriverModel } from '../models/driver';
import { RaceModel } from '../models/race';
import { ConstructorModel } from '../models/constructor';
import { CircuitModel } from '../models/circuit';
import { ErgastAdapter } from '../services/adapters/ergast-adapter';
import { OpenF1Adapter } from '../services/adapters/openf1-adapter';
import { CsvAdapter } from '../services/adapters/csv-adapter';
import type { Adapter } from '../services/adapters/base-adapter';

const adapters: Adapter[] = [new CsvAdapter(), new ErgastAdapter(), new OpenF1Adapter()];

async function runSync() {
  logger.info('Starting data sync');
  for (const adapter of adapters) {
    try {
      logger.info({ adapter: adapter.name }, 'Syncing seasons');
      const seasons = await adapter.fetchSeasons({ start: 2021, end: new Date().getFullYear() });
      await Promise.all(
        seasons.map((season) =>
          SeasonModel.updateOne({ year: season.year }, season, { upsert: true, setDefaultsOnInsert: true }),
        ),
      );

      logger.info({ adapter: adapter.name }, 'Syncing drivers');
      const drivers = await adapter.fetchDrivers();
      await Promise.all(
        drivers.map((driver) =>
          DriverModel.updateOne({ driverId: driver.driverId }, driver, {
            upsert: true,
            setDefaultsOnInsert: true,
          }),
        ),
      );

      logger.info({ adapter: adapter.name }, 'Syncing races');
      const races = await adapter.fetchRaces({ start: 2021, end: new Date().getFullYear() });
      await Promise.all(
        races.map((race) =>
          RaceModel.updateOne({ raceId: race.raceId }, race, { upsert: true, setDefaultsOnInsert: true }),
        ),
      );

      if (adapter.fetchConstructors) {
        logger.info({ adapter: adapter.name }, 'Syncing constructors');
        const constructors = await adapter.fetchConstructors();
        await Promise.all(
          constructors.map((constructor) =>
            ConstructorModel.updateOne(
              { constructorId: constructor.constructorId },
              constructor,
              { upsert: true, setDefaultsOnInsert: true },
            ),
          ),
        );
      }

      if (adapter.fetchCircuits) {
        logger.info({ adapter: adapter.name }, 'Syncing circuits');
        const circuits = await adapter.fetchCircuits();
        await Promise.all(
          circuits.map((circuit) =>
            CircuitModel.updateOne(
              { circuitId: circuit.circuitId },
              {
                circuitId: circuit.circuitId,
                name: circuit.name,
                location: {
                  lat: circuit.lat,
                  lng: circuit.lng,
                  locality: circuit.locality,
                  country: circuit.country,
                },
                url: circuit.url,
              },
              { upsert: true, setDefaultsOnInsert: true },
            ),
          ),
        );
      }
    } catch (error) {
      logger.error({ adapter: adapter.name, error }, 'Adapter sync failed');
    }
  }
  logger.info('Data sync complete');
}

export function startSyncJob() {
  cron.schedule('0 3 * * *', () => {
    void runSync();
  });
  void runSync();
}

const isDirectExecution = process.argv[1] && process.argv[1].includes('sync.ts');

if (isDirectExecution) {
  void runSync().then(() => process.exit(0));
}
