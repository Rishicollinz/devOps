FROM node:18-bullseye

RUN npm install -g nodemon

WORKDIR /app

COPY . .

RUN npm install

CMD [ "npm","run","dev" ]

EXPOSE 3001