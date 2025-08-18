FROM node:20-alpine

WORKDIR /app

# نصب openssl و bash برای Prisma
RUN apk add --no-cache openssl bash

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && npm start"
