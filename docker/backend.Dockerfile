FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY backend/package.json backend/package.json
RUN npm install --workspace backend

COPY backend ./backend

WORKDIR /app/backend

EXPOSE 3000

CMD ["npm", "run", "dev"]
