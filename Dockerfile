# Use an official Node.js runtime as a parent image
FROM node:22.14.0-alpine AS builder

WORKDIR /app
COPY . .
RUN yarn 
RUN yarn build

FROM node:22.14.0-alpine AS runner

WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENTRYPOINT [ "yarn" ]
CMD [ "start" ]