import { withCache } from '../config/redis';
import { ConstructorModel } from '../models/constructor';
import { ResultModel } from '../models/result';

export function getConstructorProfile(constructorId: string) {
  const key = `constructor:${constructorId}`;
  return withCache(key, 300, async () => {
    const constructor = await ConstructorModel.findOne({ constructorId }).lean();
    if (!constructor) {
      throw { status: 404, message: 'Constructor not found' };
    }
    const stats = await ResultModel.aggregate([
      { $match: { constructorId } },
      {
        $group: {
          _id: '$constructorId',
          points: { $sum: '$points' },
          wins: { $sum: { $cond: [{ $eq: ['$position', 1] }, 1, 0] } },
          podiums: { $sum: { $cond: [{ $lte: ['$position', 3] }, 1, 0] } },
        },
      },
    ]);
    return { constructor, stats: stats[0] ?? null };
  });
}
