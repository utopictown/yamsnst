FROM node:19-alpine
RUN mkdir -p /app/main
WORKDIR /app/main
COPY package*.json /app/main
RUN npm install
ADD . /app/main
CMD npm run build && npm run start:prod
