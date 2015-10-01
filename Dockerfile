FROM node:4.1.1

WORKDIR /app
VOLUME /app/dist

ADD package.json /app/
RUN npm install
ADD generate.js /app/

CMD node generate.js
