FROM node:stretch
WORKDIR /usr/src/app
ADD api/package*.json .
RUN yarn install
ADD api .
EXPOSE 9000
CMD ["node", "/usr/src/app/bin/www"]