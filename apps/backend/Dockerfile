# ---- base image used by every stage ----
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

FROM base AS builder
RUN yarn global add turbo
COPY . .
RUN turbo prune backend --docker

FROM base AS installer
COPY --from=builder /app/out/json/ .
RUN yarn install
COPY --from=builder /app/out/full/ .

FROM base AS dev
ENV NODE_ENV=development
WORKDIR /app
# copy the *un‑pruned* repo so nodemon sees the .ts files
COPY . .
# install deps once (kept in the layer cache)
RUN yarn install
ENV CHOKIDAR_USEPOLLING=true
CMD ["yarn","workspace","backend","dev"]

FROM base AS runner
WORKDIR /app
COPY --from=installer /app .
USER 1001
CMD ["node","apps/backend/dist/index.js"]
