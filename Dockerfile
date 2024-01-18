FROM node:18.19.0

WORKDIR /usr/homework

COPY . .

RUN npm i

EXPOSE 3000

CMD [ "npm", "start" ]
