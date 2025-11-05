import { Types } from 'mongoose';
import { FavoriteModel } from '../models/favorite';
import type { AuthRequest } from '../middlewares/auth';

export async function addFavorite(userId: string, entityType: string, entityId: string) {
  const normalizedUserId = new Types.ObjectId(userId);
  const favorite = await FavoriteModel.findOneAndUpdate(
    { userId: normalizedUserId, entityType, entityId },
    {},
    { upsert: true, new: true, setDefaultsOnInsert: true },
  ).lean();
  return favorite;
}

export function listFavorites(userId: string) {
  return FavoriteModel.find({ userId: new Types.ObjectId(userId) }).lean();
}

export function ensureAuthenticated(req: AuthRequest) {
  if (!req.user) {
    throw { status: 401, message: 'Unauthorized' };
  }
  return req.user.sub;
}
