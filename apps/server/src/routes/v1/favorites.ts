import { Router } from 'express';
import { addFavoriteHandler, listFavoritesHandler } from '../../controllers/favorite-controller';
import { authenticate } from '../../middlewares/auth';
import { validateBody } from '../../middlewares/validate';
import { favoriteSchema } from '../../schemas/favorite';

const router = Router();

router.use(authenticate);
router.post('/', validateBody(favoriteSchema), addFavoriteHandler);
router.get('/', listFavoritesHandler);

export default router;
