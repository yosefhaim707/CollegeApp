import { Router } from 'express';
import {
  getLapChartHandler,
  getRaceHandler,
  listRacesHandler,
} from '../../controllers/race-controller';

const router = Router();

router.get('/', listRacesHandler);
router.get('/:raceId', getRaceHandler);
router.get('/:raceId/laps', getLapChartHandler);

export default router;
