FROM node:16
WORKDIR /usr/src/app
WORKDIR ../
RUN git clone https://IMohamad:Flash2054@gitlab.com/digital-expeng/cap-shared-components.git
RUN cd cap-shared-components
COPY ./package.json .
RUN npm install
RUN npm run build
RUN npm link
WORKDIR ../app
CMD ["npm", "link", "cap-shared-components"]
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 4200
CMD ["npm", "run", "build:dev"]