FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/
RUN npm install
RUN npm run build --configuration=production

FROM nginx:latest

COPY --from=build /usr/local/app/dist/pretty-localstack-frontend /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /
RUN ["chmod", "+x", "/docker-entrypoint.sh"]

RUN apt-get update && apt-get install -y dos2unix
RUN dos2unix /docker-entrypoint.sh && apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/*
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
