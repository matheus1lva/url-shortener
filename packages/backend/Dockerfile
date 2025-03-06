FROM node:22-alpine as base

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /usr/src/app
RUN npm install -g pnpm

COPY . .
RUN pnpm install
RUN pnpm build

FROM node:22-alpine as production

ARG DATABASE_URL
WORKDIR /usr/src/app
RUN npm install -g pnpm

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/dist ./dist

ENV DATABASE_URL=${DATABASE_URL}

EXPOSE 3000
ENTRYPOINT ["node", "./dist/app/src/main.js"]
