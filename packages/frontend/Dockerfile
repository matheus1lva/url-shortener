FROM node:22-alpine as build

WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY . .

RUN npm i -g pnpm && pnpm install

RUN pnpm build

FROM node:22-alpine as production

COPY --from=build /app/dist ./dist

EXPOSE 5173

CMD ["npx", "http-server", "-p", "5173", "./dist"]
