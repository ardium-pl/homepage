# Build stage
# Angular 22 requires Node.js >= 22.22.3
FROM node:22-alpine AS builder

WORKDIR /app

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

# Build the Angular application (outputs to dist/homepage/browser/{pl,en})
# and compile the Express server (outputs to server/dist)
ENV NG_CLI_ANALYTICS=false
RUN cd client && pnpm run build
RUN cd server && pnpm run build

# Keep only the server's runtime dependencies for the production stage
RUN cd server && pnpm prune --prod

# Production stage with Node.js
# Express serves the Angular app (with /pl and /en locale routing) and the contact form API
FROM node:22-alpine AS production

WORKDIR /app

# The server looks for the Angular app in ../dist/homepage/browser
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/package.json ./server/
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/server/dist ./server/dist

ENV NODE_ENV=production

# Railway provides PORT
EXPOSE 3000

WORKDIR /app/server

# Run as the unprivileged user provided by the node image
USER node

CMD ["node", "dist/index.js"]
