FROM node:20-alpine AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./
COPY apps/web/package.json apps/web/
COPY packages ./packages
RUN npm install -g pnpm@8.15.4
RUN pnpm install --filter @f1-stats-suite/web...
COPY apps/web ./apps/web
RUN pnpm --filter @f1-stats-suite/web build

FROM node:20-alpine
WORKDIR /app
COPY --from=base /app/apps/web/dist ./dist
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "4173"]
