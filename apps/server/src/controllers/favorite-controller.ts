import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth';
import { addFavorite, ensureAuthenticated, listFavorites } from '../services/favorite-service';

export async function addFavoriteHandler(req: AuthRequest, res: Response) {
  const userId = ensureAuthenticated(req);
  const favorite = await addFavorite(userId, req.body.entityType, req.body.entityId);
  res.status(201).json({ data: favorite });
}

export async function listFavoritesHandler(req: AuthRequest, res: Response) {
  const userId = ensureAuthenticated(req);
  const favorites = await listFavorites(userId);
  res.json({ data: favorites });
}
