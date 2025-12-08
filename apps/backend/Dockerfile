# ---- Base image ----
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable

# ---- Builder for pruning and installing ----
FROM base AS builder
RUN yarn global add turbo
COPY . .
RUN turbo prune backend --docker

# ---- Installer stage: install deps and build
FROM base AS installer
WORKDIR /app

# Copy pruned package and lock files
COPY --from=builder /app/out/json/ .
RUN yarn install

# Copy full backend source
COPY --from=builder /app/out/full/ .

# Create uploads directory and assign proper permissions
RUN mkdir -p /app/uploads \
  && chown -R 1001:0 /app/uploads \
  && chmod -R 755 /app/uploads

# Fix write permissions to avoid build errors
RUN chmod -R 755 /app/packages/logger

# Build workspaces in correct order
RUN yarn workspace @repo/logger build

# Build backend (which includes postbuild script to copy openapi.yaml)
RUN yarn workspace backend build

# Verify the openapi.yaml file was copied
RUN ls -la /app/apps/backend/dist/api-routes/

# ---- Dev mode (used for local development with volumes) ----
FROM base AS dev
WORKDIR /app
COPY . .
RUN yarn install
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
CMD ["yarn", "workspace", "backend", "dev"]

# ---- Production runner ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built app from installer stage
COPY --from=installer /app .

# Drop privileges: run as non-root user
USER 1001

CMD ["node", "apps/backend/dist/index.js"]
