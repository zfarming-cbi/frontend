FROM node:lts as builder
WORKDIR /source
COPY . .

ENV VITE_APP_ENV='production'
ENV VITE_APP_TITLE='ZERO FARMING'
ENV VITE_SERVER_URL='https://zfarming-backend.projects.kriverdevice.com/api/v1'
ENV VITE_IMAGES_URL='https://zfarming-backend.projects.kriverdevice.com/'

RUN yarn install
RUN yarn build
RUN mv dist app

FROM socialengine/nginx-spa:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /source/app /app
RUN chmod -R 777 /app
