FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8071

CMD ["npm", "start"]