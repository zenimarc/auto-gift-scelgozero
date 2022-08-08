FROM node:lts-alpine as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN mpn run build




FROM node:lts-alpine as production
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci --only=production
COPY --from=development /usr/src/app/out ./out
CMD ["node", "out/index.js"]





