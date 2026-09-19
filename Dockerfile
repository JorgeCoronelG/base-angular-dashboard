# ---- Desarrollo (ng serve con hot reload) ----
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
EXPOSE 4200
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]

# ---- Build de producción ----
FROM dev AS build
RUN npm run build

# ---- Producción (nginx) ----
FROM nginx:1.27-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/vex /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
