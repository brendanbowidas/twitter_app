#docker-compose build node && docker-compose up -d node

FROM node:latest

RUN npm install -g pm2

RUN mkdir -p /var/www/server

WORKDIR /var/www/server

ADD . /var/www/server

RUN npm install

RUN NODE_ENV=production

EXPOSE 3000

CMD pm2 start --no-deamon --name api index.js -x -- --optimize_for_size --max_old_space_size=460 --gc_interval=100
