import type { RequestHandler } from 'express';
import type { AnyZodObject } from 'zod';

export function validateBody(schema: AnyZodObject): RequestHandler {
  return (req, _res, next) => {
    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
      next({ status: 400, message: 'Validation failed', issues: parseResult.error.issues });
      return;
    }
    req.body = parseResult.data;
    next();
  };
}
