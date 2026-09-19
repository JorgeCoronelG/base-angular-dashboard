# syntax=docker/dockerfile:1

# ---- Development (ng serve with hot reload) ----
FROM node:24-alpine AS dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]

# ---- Production build ----
FROM dev AS build
RUN npm run build

# ---- Production runtime (unprivileged nginx, listens on 8080) ----
FROM nginxinc/nginx-unprivileged:1.27-alpine AS prod
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.inc.template /etc/nginx/security-headers.inc.template
COPY --chmod=755 nginx/40-runtime-config.sh /docker-entrypoint.d/40-runtime-config.sh
COPY --from=build /app/dist/base-angular-dashboard/browser /usr/share/nginx/html
# Deployment settings (see nginx/40-runtime-config.sh)
ENV API_URL=/api
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz || exit 1
