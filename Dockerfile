FROM node:lts as builder
WORKDIR /source
COPY . .
ARG VITE_APP_TITLE=""
ARG VITE_SERVER_URL=""
RUN yarn install
RUN yarn build
RUN mv dist app

FROM nginx:1.19.1-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /source/app .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]