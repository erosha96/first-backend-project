FROM --platform=amd64 node:16.13.2-alpine

ARG STORAGE_DIR=/var/www/storage
RUN mkdir -p ${STORAGE_DIR}
RUN mkdir -p ${STORAGE_DIR}/files/original
RUN mkdir -p ${STORAGE_DIR}/files/resized
WORKDIR ${STORAGE_DIR}/files/resized
RUN pwd
RUN mkdir -p 256 512 1024 2048
RUN ls
WORKDIR 256
RUN pwd

ARG APP_DIR=/var/www/api
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm i

CMD npm run dev
