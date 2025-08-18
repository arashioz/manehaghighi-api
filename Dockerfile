FROM node:18-alpine

# پوشه کاری
WORKDIR /app

# نصب dependency های مورد نیاز
RUN apk add --no-cache openssl1.1-compat bash

# کپی پکیج‌ها
COPY package*.json ./

# نصب dependency ها
RUN npm install

# کپی کل پروژه
COPY . .

# بیلد پروژه
RUN npm run build

EXPOSE 3000

# اجرای مایگریشن و استارت
CMD sh -c "npx prisma migrate deploy && npm run db:push && npm start"
