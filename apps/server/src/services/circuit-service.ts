import { CircuitModel } from '../models/circuit';
import { withCache } from '../config/redis';

export function listCircuits() {
  return withCache('circuits:list', 600, () => CircuitModel.find().lean());
}
