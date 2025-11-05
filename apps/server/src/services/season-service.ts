import { withCache } from '../config/redis';
import { SeasonModel } from '../models/season';
import { ResultModel } from '../models/result';

export function listSeasons() {
  return withCache('seasons:list', 300, () => SeasonModel.find().sort({ year: -1 }).lean());
}

export async function getDriverStandings(year: number) {
  const cacheKey = `season:${year}:driverStandings`;
  return withCache(cacheKey, 300, async () => {
    const races = await ResultModel.aggregate([
      { $match: { raceId: { $regex: `^${year}` } } },
      {
        $group: {
          _id: '$driverId',
          points: { $sum: '$points' },
          wins: {
            $sum: {
              $cond: [{ $eq: ['$position', 1] }, 1, 0],
            },
          },
          podiums: {
            $sum: {
              $cond: [{ $lte: ['$position', 3] }, 1, 0],
            },
          },
          averageFinish: { $avg: '$position' },
        },
      },
      {
        $project: {
          driverId: '$_id',
          points: 1,
          wins: 1,
          podiums: 1,
          averageFinish: { $round: ['$averageFinish', 2] },
        },
      },
      { $sort: { points: -1 } },
    ]);
    return races;
  });
}
