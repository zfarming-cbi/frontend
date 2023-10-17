FROM node:lts as builder
WORKDIR /source
COPY . .

ENV VITE_APP_ENV='production'
ENV VITE_APP_TITLE='ZERO FARMING'
ENV VITE_SERVER_URL="https://zfarming-backend.projects.kriverdevice.com/api/v1"

RUN yarn install
RUN yarn build
RUN mv dist app

FROM nginx:1.19.1-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /source/app .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]