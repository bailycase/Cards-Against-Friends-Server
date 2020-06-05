FROM node:12-alpine

RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python && \
    yarn global add node-gyp -g

WORKDIR /usr/src/app

COPY ["package.json", "/usr/src/app/"]

RUN yarn install 

COPY [".", "./"]

RUN yarn build

COPY ["ssl", "dist/ssl"]

CMD ["node", "dist/index.js"]