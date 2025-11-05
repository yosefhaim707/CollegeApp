import { Router } from 'express';
import { registerHandler, loginHandler, refreshHandler } from '../../controllers/auth-controller';
import { validateBody } from '../../middlewares/validate';
import { loginSchema, registerSchema } from '../../schemas/auth';

const router = Router();

router.post('/register', validateBody(registerSchema), registerHandler);
router.post('/login', validateBody(loginSchema), loginHandler);
router.post('/refresh', refreshHandler);

export default router;
