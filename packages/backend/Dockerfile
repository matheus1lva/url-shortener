FROM node:22-alpine as base

ARG IKON_GIT_TOKEN

WORKDIR /usr/src/app
RUN npm install -g pnpm

COPY . .
RUN pnpm install
RUN pnpm build

FROM node:22-alpine as production

ARG IKON_GIT_TOKEN

WORKDIR /usr/src/app
RUN npm install -g pnpm

COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/dist ./dist

EXPOSE 4000
CMD ["node", "/usr/src/app/dist/src/main.js"]
