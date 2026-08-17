# --- Build stage ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Sanity (Vite) embeds these into the static bundle at build time,
# so they must be passed as build args, not runtime env vars.
ARG SANITY_STUDIO_PROJECT_ID
ARG SANITY_STUDIO_DATASET
ARG SANITY_STUDIO_TITLE
ENV SANITY_STUDIO_PROJECT_ID=$SANITY_STUDIO_PROJECT_ID \
    SANITY_STUDIO_DATASET=$SANITY_STUDIO_DATASET \
    SANITY_STUDIO_TITLE=$SANITY_STUDIO_TITLE

RUN npm run build

# --- Runtime stage ---
FROM nginx:alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
