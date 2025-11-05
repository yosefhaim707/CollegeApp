import type { ErrorRequestHandler } from 'express';
import { logger } from '../config/logger';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = typeof err.status === 'number' ? err.status : 500;
  const message = err.message || 'Internal server error';
  logger.error({ err }, 'Request failed');
  res.status(status).json({ message, status, issues: err.issues });
};
