FROM node:5.0.0
MAINTAINER Steven Maasch <maasch@stevenmaasch.de>

RUN npm install -g gulp

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install

COPY . /usr/src/app
RUN gulp production

EXPOSE 8080

CMD ["node", "."]
