FROM node:20 AS builder

WORKDIR /app

COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.yarnrc.yml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/main.js"]
