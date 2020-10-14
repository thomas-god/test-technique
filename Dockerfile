FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install
RUN echo $NODE_ENV

COPY . .

RUN npx tsc

ENTRYPOINT [ "node", "dist/index.js" ]
