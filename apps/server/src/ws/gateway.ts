import type { Server as HTTPServer } from 'http';
import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import { env } from '../config/env';
import { logger } from '../config/logger';

interface Subscription {
  raceId?: string;
  driverId?: string;
}

const driverBasePace: Record<string, number> = {
  VER: 78000,
  HAM: 78500,
  LEC: 79000,
};

export function initializeWebSocket(server: HTTPServer) {
  const wss = new WebSocketServer({ server, path: '/live' });
  const subscriptions = new WeakMap<WebSocket, Subscription>();

  wss.on('connection', (socket) => {
    logger.info('Client connected to live WS');
    subscriptions.set(socket, {});

    socket.on('message', (message) => {
      try {
        const payload = JSON.parse(message.toString());
        subscriptions.set(socket, payload);
      } catch (error) {
        logger.warn({ error }, 'Invalid subscription message');
      }
    });
  });

  if (env.SIMULATE_LIVE === 'true') {
    setInterval(() => {
      for (const client of wss.clients) {
        if (client.readyState !== client.OPEN) continue;
        const sub = subscriptions.get(client) ?? {};
        const drivers = Object.keys(driverBasePace);
        const lap = Math.floor(Math.random() * 50) + 1;
        const driverId = sub.driverId ?? drivers[Math.floor(Math.random() * drivers.length)];
        const base = driverBasePace[driverId] ?? 80000;
        const variance = Math.floor(Math.random() * 2000) - 1000;
        client.send(
          JSON.stringify({
            event: 'live:lap',
            data: {
              raceId: sub.raceId ?? '2023-01',
              driverId,
              lap,
              timeMs: base + variance,
              sectorTimesMs: [base / 3, base / 3, base / 3 + variance],
            },
          }),
        );
      }
    }, 4000);
  }

  return wss;
}
