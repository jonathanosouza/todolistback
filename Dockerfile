FROM node:latest

WORKDIR /app

COPY package.json ./
COPY .env ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
