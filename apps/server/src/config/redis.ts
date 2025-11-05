import Redis from 'ioredis';
import { env } from './env';

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
});

export async function withCache<T>(key: string, ttl: number, resolver: () => Promise<T>): Promise<T> {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached) as T;
  }
  const value = await resolver();
  await redis.set(key, JSON.stringify(value), 'EX', ttl);
  return value;
}
