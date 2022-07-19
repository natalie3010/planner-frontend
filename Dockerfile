FROM node:16
WORKDIR /user/src/app
COPY ./index.js ./index.js
CMD node index.js