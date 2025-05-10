FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

ARG NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_API_HOST=$NEXT_PUBLIC_API_HOST

FROM base AS builder
RUN yarn global add turbo
COPY . .
RUN turbo prune frontend --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN yarn install
COPY --from=builder /app/out/full/ .
RUN yarn workspace frontend build

FROM base AS dev
WORKDIR /app
COPY . .
RUN yarn install
CMD ["yarn", "workspace", "frontend", "dev"]

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

ENV NODE_ENV=production
CMD ["node", "apps/frontend/server.js"]
