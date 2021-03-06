FROM node:12.19-buster
WORKDIR /app

RUN apt-get update
RUN apt-get install -y nginx

RUN apt-get -y install gettext-base

ADD package*.json ./
RUN npm install

ADD . .
RUN npm run client:build_for_production
RUN npm run server:build_for_production

EXPOSE 3000
EXPOSE 8888

# be able to start as client if needed
COPY replaceVariables.sh .
COPY template/nginx/app.conf.template /etc/nginx/conf.d/app.conf
ENTRYPOINT ["./entrypoint.sh"]
CMD npm run server:run_for_production
