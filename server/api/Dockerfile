FROM node:18.14-alpine

WORKDIR /usr/src/app

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]