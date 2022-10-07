FROM node:16.17.0

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".", "/usr/src/"]

# RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
