# Base image for all stages
FROM oven/bun:1.2.19 AS base
WORKDIR /usr/src/app

# Install necessary tools and CA bundle for TLS to RDS
RUN apt-get update \
	&& apt-get install -y curl ca-certificates \
	&& update-ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

# Default port for the app
ARG PORT=3001 

###############################
# DEPENDENCIES INSTALLATION
###############################
FROM base AS install

# Install dependencies into temp directories
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install production dependencies separately
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
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
COPY bunfig.toml .

# Add AWS RDS CA bundle so Node trusts RDS certificates
RUN curl -fsSL https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem -o /etc/ssl/certs/rds-ca-bundle.pem

# Set correct permissions before switching user
RUN chown -R bun:bun /usr/src/app
USER bun

# Copy generated Prisma client/binaries from build stage so we don't need to generate in prod
COPY --from=build /usr/src/app/node_modules/.prisma node_modules/.prisma
COPY --from=build /usr/src/app/node_modules/@prisma node_modules/@prisma

EXPOSE ${PORT}

CMD ["bun", "run", "start:prod"]
