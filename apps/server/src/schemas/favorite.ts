import { z } from 'zod';

export const favoriteSchema = z.object({
  entityType: z.enum(['driver', 'constructor', 'race']),
  entityId: z.string(),
});

export type FavoriteInput = z.infer<typeof favoriteSchema>;
