# cd frontend
# docker build -t jafber/myeloma-predict-frontend .
# docker run --rm -p 5173:80 jafber/myeloma-predict-frontend

# Build stage
FROM node:20-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV NODE_ENV=production
RUN npm run build

# Runtime stage
FROM caddy:2-alpine

# curl for health check
RUN apk --no-cache add curl

WORKDIR /srv

COPY --from=build /app/dist /srv

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
