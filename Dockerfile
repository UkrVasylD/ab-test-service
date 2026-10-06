FROM node:22-alpine3.23

WORKDIR /app

COPY package*.json ./
RUN apk upgrade --no-cache && npm ci --omit=dev

COPY migrations ./migrations
COPY src ./src

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "npm run migrate && npm start"]