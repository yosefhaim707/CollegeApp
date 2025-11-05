import { Router } from 'express';
import { driverStandingsHandler, listSeasonsHandler } from '../../controllers/season-controller';

const router = Router();

router.get('/', listSeasonsHandler);
router.get('/:year/standings/drivers', driverStandingsHandler);

export default router;
