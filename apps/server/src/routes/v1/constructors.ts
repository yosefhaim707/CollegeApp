import { Router } from 'express';
import { getConstructorHandler } from '../../controllers/constructor-controller';

const router = Router();

router.get('/:constructorId', getConstructorHandler);

export default router;
