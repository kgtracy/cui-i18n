FROM node:4.1.1

WORKDIR /app
VOLUME /app/dist

ADD package.json /app/
RUN echo 'deb http://httpredir.debian.org/debian jessie-backports main' > /etc/apt/sources.list.d/jessie-backports.list
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk && \
    npm install
ADD generate.js /app/
ADD scripts/native2ascii /app/generate-native2ascii

CMD node generate.js && ./generate-native2ascii
