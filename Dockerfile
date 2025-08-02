# Stage 1: Base stage for dependencies
FROM node:20-alpine AS base
WORKDIR /app 
COPY package*.json ./ 
RUN npm install 
COPY . .

# Stage 2: Build the React app
FROM base AS build
# Don't set VITE_BASE for Docker deployment
ENV NODE_ENV=production
RUN npm run build

# Stage 3: Production with Nginx
FROM nginx:alpine 
COPY --from=build /app/dist /usr/share/nginx/html 
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80 
CMD ["nginx", "-g", "daemon off;"]