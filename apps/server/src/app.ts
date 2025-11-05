import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { env, corsOrigins } from './config/env';
import { logger } from './config/logger';
import { apiRouter } from './routes/v1';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(
  pinoHttp({
    logger,
    autoLogging: { ignorePaths: ['/healthz'] },
  }),
);
app.use(express.json());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok', env: env.NODE_ENV });
});

app.use('/v1', apiRouter);

app.use(errorHandler);

export { app };
