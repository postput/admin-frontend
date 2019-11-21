FROM node:10 as build-prod
ARG WORKDIR=/home/node/app
ARG DEPLOY_URL=https://www.postput.com
ENV DEPLOY_URL=$DEPLOY_URL
WORKDIR $WORKDIR
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY angular.json .
COPY tsconfig.json .
COPY src src
RUN npm run prod

FROM node:10 as prod
CMD ["npm","start"]
ARG WORKDIR=/home/node/app
WORKDIR $WORKDIR
COPY server/package.json .
COPY server/package-lock.json .
RUN npm i
COPY server/tsconfig.json .
COPY server/src src
COPY --from=build-prod $WORKDIR/dist /home/node/app/public
