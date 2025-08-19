FROM node:20-alpine

WORKDIR /app

# نصب openssl و bash برای Prisma
RUN apk add --no-cache openssl bash libc6-compat

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# Ensure Prisma Client is generated in the image
RUN npx prisma generate

# کپی کردن فایل‌های استاتیک قبل از build
RUN mkdir -p src/static

RUN npm run build

# اطمینان از وجود فایل‌های استاتیک در dist
RUN ls -la dist/static/assets/

EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && npm run db:push && npm start"
