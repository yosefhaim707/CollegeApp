import { withCache } from '../config/redis';
import { ResultModel } from '../models/result';

export async function driverComparison(driverA: string, driverB: string, range?: string) {
  const key = `analytics:driver:${driverA}:${driverB}:${range ?? 'career'}`;
  return withCache(key, 300, async () => {
    const match: Record<string, unknown> = { driverId: { $in: [driverA, driverB] } };
    if (range?.startsWith('season:')) {
      const [, season] = range.split(':');
      match.raceId = { $regex: `^${season}` };
    }

    const aggregate = await ResultModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$driverId',
          starts: { $sum: 1 },
          wins: { $sum: { $cond: [{ $eq: ['$position', 1] }, 1, 0] } },
          podiums: { $sum: { $cond: [{ $lte: ['$position', 3] }, 1, 0] } },
          points: { $sum: '$points' },
          avgFinish: { $avg: '$position' },
        },
      },
      {
        $project: {
          driverId: '$_id',
          starts: 1,
          wins: 1,
          podiums: 1,
          points: 1,
          avgFinish: { $round: ['$avgFinish', 2] },
        },
      },
    ]);

    return aggregate;
  });
}
