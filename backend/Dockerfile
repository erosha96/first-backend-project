FROM node:16.13.2-alpine

ARG STORAGE_DIR=/var/www/storage
RUN mkdir -p ${STORAGE_DIR}
RUN mkdir -p files/original
RUN mkdir -p files/resized
RUN cd files/resized
RUN mkdir 256 512 1024 2048

ARG APP_DIR=/var/www/api
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm i

CMD npm run dev
