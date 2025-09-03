# Base image for all stages
FROM node:18-alpine AS base
WORKDIR /usr/src/app

# Install necessary tools and CA bundle for TLS to RDS
RUN apk add --no-cache curl ca-certificates

# Default port for the app
ARG PORT=3001 

###############################
# DEPENDENCIES INSTALLATION
###############################
FROM base AS install

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies into temp directories
RUN mkdir -p /temp/dev
COPY package.json pnpm-lock.yaml .pnpmrc /temp/dev/
RUN cd /temp/dev && pnpm install --frozen-lockfile

# Install production dependencies separately
RUN mkdir -p /temp/prod
COPY package.json pnpm-lock.yaml .pnpmrc /temp/prod/
RUN cd /temp/prod && pnpm install --frozen-lockfile --prod

###############################
# DEVELOPMENT
###############################
FROM base AS development

# Install pnpm globally
RUN npm install -g pnpm

COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Set correct permissions before switching user
RUN chown -R node:node /usr/src/app
USER node

# Generate Prisma client before starting the app
RUN pnpm run prisma:generate

EXPOSE ${PORT}

CMD ["pnpm", "run", "start:dev:docker"]

###############################
# BUILD
###############################
FROM base AS build

# Install pnpm globally
RUN npm install -g pnpm

COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Set correct permissions before switching user
RUN chown -R node:node /usr/src/app
USER node

# Generate Prisma client before building
RUN pnpm run prisma:generate

ENV NODE_ENV=production
RUN pnpm run build

###############################
# PRODUCTION
###############################
FROM base AS production

# Install pnpm globally first
RUN npm install -g pnpm

COPY --from=install /temp/prod/node_modules node_modules
COPY --from=build /usr/src/app/dist dist
COPY package.json .
COPY prisma prisma
COPY pnpm-lock.yaml .

# Add AWS RDS CA bundle so Node trusts RDS certificates
RUN curl -fsSL https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem -o /etc/ssl/certs/rds-ca-bundle.pem

# Set correct permissions before switching user
RUN chown -R node:node /usr/src/app
USER node

# Generate Prisma client in production stage to ensure it exists
RUN pnpm run prisma:generate

EXPOSE ${PORT}

CMD ["pnpm", "run", "start:prod"]
