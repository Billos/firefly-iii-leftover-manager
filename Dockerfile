# Use an official Node.js runtime as a parent image
FROM node:22.14.0-alpine AS builder

WORKDIR /app
COPY . .
RUN yarn 
RUN yarn build

# Final production image
FROM node:22.14.0-alpine AS runtime
WORKDIR /app

COPY ./package.json ./package.json
RUN npm install --omit=dev
COPY --from=builder /app/build ./build

EXPOSE 3000

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]