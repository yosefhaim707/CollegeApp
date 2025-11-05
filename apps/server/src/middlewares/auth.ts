import type { Request, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AuthRequest extends Request {
  user?: { sub: string; roles: string[] };
}

export const authenticate: RequestHandler = (req: AuthRequest, _res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return next({ status: 401, message: 'Missing authorization header' });
  }
  const token = header.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { sub: string; roles: string[] };
    req.user = decoded;
    next();
  } catch (error) {
    next({ status: 401, message: 'Invalid token', error });
  }
};

export function requireRole(role: 'admin' | 'user'): RequestHandler {
  return (req: AuthRequest, _res, next) => {
    if (!req.user) {
      return next({ status: 401, message: 'Unauthorized' });
    }
    if (!req.user.roles.includes(role)) {
      return next({ status: 403, message: 'Forbidden' });
    }
    next();
  };
}
