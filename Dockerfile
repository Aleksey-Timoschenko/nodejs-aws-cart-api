FROM node:alpine as install

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

FROM install as build

WORKDIR /app

COPY . .

RUN npm run build

FROM node:alpine as production

WORKDIR /app

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001

CMD ["node", "./dist/main"]