FROM node:20-alpine AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/server/package.json apps/server/
COPY packages ./packages
RUN npm install -g pnpm@8.15.4
RUN pnpm install --filter @f1-stats-suite/server...
COPY apps/server ./apps/server
RUN pnpm --filter @f1-stats-suite/server build

FROM node:20-alpine
WORKDIR /app
COPY --from=base /app/apps/server/dist ./dist
COPY --from=base /app/apps/server/package.json ./package.json
RUN npm install -g pnpm@8.15.4 && pnpm install --prod
CMD ["node", "dist/server.js"]
