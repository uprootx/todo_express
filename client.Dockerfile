FROM node:alpine
WORKDIR /app
ADD client/package*.json .
RUN yarn install
ADD client .
RUN yarn build
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]