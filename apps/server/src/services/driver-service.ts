import { withCache } from '../config/redis';
import { DriverModel } from '../models/driver';

export async function listDrivers(search?: string) {
  const key = `drivers:list:${search ?? 'all'}`;
  return withCache(key, 60, async () => {
    if (search) {
      return DriverModel.find(
        { $text: { $search: search } },
        { score: { $meta: 'textScore' } },
      )
        .sort({ score: { $meta: 'textScore' } })
        .lean();
    }
    return DriverModel.find().lean();
  });
}

export async function getDriverById(driverId: string) {
  const key = `drivers:${driverId}`;
  return withCache(key, 60, async () => {
    const driver = await DriverModel.findOne({ driverId }).lean();
    if (!driver) {
      throw { status: 404, message: 'Driver not found' };
    }
    return driver;
  });
}
