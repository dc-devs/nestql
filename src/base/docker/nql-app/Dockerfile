# Base image for all stages
# Hardocding to 1.1.29 to resolve Prisma generation issues with 1.1.30
FROM oven/bun:1.1.29 AS base
WORKDIR /usr/src/app

# Default port for the app
ARG PORT=3001 

###############################
# DEPENDENCIES INSTALLATION
###############################
FROM base AS install

# Install dependencies into temp directories
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install production dependencies separately
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

###############################
# DEVELOPMENT
###############################
FROM base AS development
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Set correct permissions before switching user
RUN chown -R bun:bun /usr/src/app
USER bun

# Generate Prisma client before starting the app
RUN bunx prisma generate

EXPOSE ${PORT}
CMD ["bun", "run", "start:dev:docker"]

###############################
# BUILD
###############################
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Set correct permissions before switching user
RUN chown -R bun:bun /usr/src/app
USER bun

# Generate Prisma client before building
RUN bunx prisma generate

ENV NODE_ENV=production
RUN bun run build

###############################
# PRODUCTION
###############################
FROM base AS production
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build /usr/src/app/dist dist
COPY package.json .
COPY prisma prisma

# Set correct permissions before switching user
RUN chown -R bun:bun /usr/src/app
USER bun

# Generate Prisma client in production
RUN bunx prisma generate

EXPOSE ${PORT}
CMD ["bun", "run", "start:prod"]