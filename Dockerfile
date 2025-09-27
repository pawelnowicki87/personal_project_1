FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["sh", "-c", "node src/config/wait-for-db.js && npm start"]
