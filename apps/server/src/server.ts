import http from 'http';
import { app } from './app';
import { connectDatabase } from './db';
import { env } from './config/env';
import { logger } from './config/logger';
import { initializeWebSocket } from './ws/gateway';
import { startSyncJob } from './jobs/sync';

async function main() {
  await connectDatabase();
  const server = http.createServer(app);
  initializeWebSocket(server);
  startSyncJob();
  server.listen(Number(env.PORT), () => {
    logger.info(`Server listening on port ${env.PORT}`);
  });
}

void main();
