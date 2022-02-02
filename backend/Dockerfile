FROM node:16.13.2-alpine

ARG APP_DIR=/var/www/api
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./
RUN npm i

CMD npm run dev
