# استفاده از Node با Debian برای OpenSSL درست
FROM node:18-bullseye

# ایجاد مسیر اپ
WORKDIR /app

# کپی package.json و package-lock.json
COPY package*.json ./

# نصب dependencies
RUN npm install

# کپی بقیه پروژه
COPY . .

# اکسپوز پورت بک‌اند
EXPOSE 3000

# دستور پیش‌فرض (می‌تونی با docker-compose override کنی)
CMD sh -c "npx prisma migrate deploy && npx prisma db push --schema='./prisma/schema.prisma' && npm start"
