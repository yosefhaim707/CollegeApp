import { Router } from 'express';
import { driverComparisonHandler } from '../../controllers/analytics-controller';

const router = Router();

router.get('/driver-comparison', driverComparisonHandler);

export default router;
