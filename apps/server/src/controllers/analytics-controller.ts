import type { Request, Response } from 'express';
import { driverComparison } from '../services/analytics-service';

export async function driverComparisonHandler(req: Request, res: Response) {
  const { driverA, driverB, range } = req.query;
  if (!driverA || !driverB) {
    throw { status: 400, message: 'driverA and driverB query params are required' };
  }
  const data = await driverComparison(driverA.toString(), driverB.toString(), range?.toString());
  res.json({ data, updatedAt: new Date().toISOString(), source: 'mongo' });
}
