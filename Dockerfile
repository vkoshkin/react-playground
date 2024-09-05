FROM node:22-alpine AS builder

WORKDIR /app
COPY public/ /app/public
COPY src/ /app/src
COPY package.json package-lock.json tsconfig.json /app/
RUN npm install
RUN npm run build

FROM nginx:1.27
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
