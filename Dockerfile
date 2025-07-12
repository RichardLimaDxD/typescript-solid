# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.3.0

ARG NODE_ENV=development

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN apk add --no-cache curl

COPY package*.json ./
RUN npm ci

COPY . .

RUN chown -R node:node /usr/src/app

USER node

RUN npx prisma generate

EXPOSE 3333

CMD npm run start:dev