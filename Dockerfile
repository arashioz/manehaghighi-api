FROM node:20-alpine

WORKDIR /app

# نصب openssl و bash برای Prisma
RUN apk add --no-cache openssl bash

COPY package*.json ./
RUN npm install

COPY . .

# کپی کردن فایل‌های استاتیک قبل از build
RUN mkdir -p src/static

RUN npm run build

# اطمینان از وجود فایل‌های استاتیک در dist
RUN ls -la dist/static/assets/

EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && npm start"
