# Use an official Node.js runtime as a parent image
FROM node:22.6.0

RUN apt-get update
RUN apt-get install -y \
        wget \ 
        iputils-ping \
        dnsutils \ 
        iproute2

WORKDIR /app

COPY . .

RUN yarn 

RUN yarn build

ENTRYPOINT [ "yarn", "run" ]
CMD [ "start" ]