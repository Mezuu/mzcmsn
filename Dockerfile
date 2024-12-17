FROM node:alpine3.19 AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY . .

RUN npm ci
RUN npm run build

FROM busybox:1.35 AS deploy
WORKDIR /app

# Copy the static website
# Use the .dockerignore file to control what ends up inside the image!
COPY --from=build /app/dist/ ./

EXPOSE 3000
# Run BusyBox httpd
CMD ["busybox", "httpd", "-f", "-v", "-h", "/app", "-p", "0.0.0.0:3000"]