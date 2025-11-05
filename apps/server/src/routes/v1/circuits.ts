import { Router } from 'express';
import { listCircuitsHandler } from '../../controllers/circuit-controller';

const router = Router();

router.get('/', listCircuitsHandler);

export default router;
