
FROM node:18.13
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY ./package.json /home/node/app
RUN npm install
COPY ./ /home/node/app
CMD [ "npm","start" ]
EXPOSE 8080
EXPOSE 9090