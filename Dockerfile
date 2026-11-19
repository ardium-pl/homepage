# Build stage
# Angular 22 requires Node.js >= 22.22.3
FROM node:22-alpine AS builder

WORKDIR /app

# Build switch: production (default) or development
ARG APP_ENV=production
ENV APP_ENV=${APP_ENV}

# Install pnpm globally
RUN npm install -g pnpm@12.11.2

# Copy client and server package files and install dependencies (cached while source is unchanged).
COPY client/package.json client/pnpm-lock.yaml client/pnpm-workspace.yaml ./client/
RUN cd client && pnpm install --frozen-lockfile

COPY server/package.json server/pnpm-lock.yaml ./server/
RUN cd server && pnpm install --frozen-lockfile

# Copy client and server source code
COPY client/ ./client/
COPY server/ ./server/

# Build the Angular application with APP_ENV-driven config
# and compile the Express server (outputs to server/dist)
ENV NG_CLI_ANALYTICS=false
RUN if [ "$APP_ENV" = "development" ]; then \
			cd client && pnpm run build:development; \
		else \
			cd client && pnpm run build; \
		fi
RUN cd server && pnpm run build

# Keep only runtime dependencies for production images
RUN if [ "$APP_ENV" = "production" ]; then \
			cd server && pnpm prune --prod; \
		fi

# Runtime stage with Node.js
# Express serves the Angular app (with /pl and /en locale routing) and the contact form API
FROM node:22-alpine AS runtime

WORKDIR /app

ARG APP_ENV=production
ENV APP_ENV=${APP_ENV}
ENV NODE_ENV=${APP_ENV}

# The server looks for the Angular app in ../dist/homepage/browser
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/package.json ./server/
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/server/dist ./server/dist

# Railway provides PORT
EXPOSE 3000

WORKDIR /app/server

# Run as the unprivileged user provided by the node image
USER node

CMD ["node", "dist/index.js"]
