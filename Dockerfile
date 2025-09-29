FROM node:20-slim

WORKDIR /app

# 📦 Instalacja zależności
COPY package*.json ./
RUN npm install && apt-get update && apt-get install -y netcat-openbsd

# 📁 Kopiujemy kod źródłowy
COPY . .

# ✅ Czekamy na DB ➜ seed ➜ start
CMD ["sh", "-c", "node src/config/wait-for-db.js && npm run seed && npm start"]

