import { Router } from 'express';
import authRouter from './auth';
import driversRouter from './drivers';
import favoritesRouter from './favorites';
import seasonsRouter from './seasons';
import racesRouter from './races';
import analyticsRouter from './analytics';
import constructorsRouter from './constructors';
import circuitsRouter from './circuits';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/drivers', driversRouter);
apiRouter.use('/favorites', favoritesRouter);
apiRouter.use('/seasons', seasonsRouter);
apiRouter.use('/races', racesRouter);
apiRouter.use('/analytics', analyticsRouter);
apiRouter.use('/constructors', constructorsRouter);
apiRouter.use('/circuits', circuitsRouter);
