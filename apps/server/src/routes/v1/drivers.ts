import { Router } from 'express';
import { getDriverHandler, listDriversHandler } from '../../controllers/driver-controller';

const router = Router();

router.get('/', listDriversHandler);
router.get('/:driverId', getDriverHandler);

export default router;
