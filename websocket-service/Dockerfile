FROM node:19-alpine
RUN mkdir -p /app/ws
WORKDIR /app/ws
COPY package*.json /app/ws
RUN npm install
ADD . /app/ws
EXPOSE 80
CMD npm run build && npm run start:prod
