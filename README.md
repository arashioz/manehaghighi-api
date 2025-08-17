# 🚀 Mane Haghighi Backend - Complete Setup

## 🎯 What This Setup Includes

- **PostgreSQL Database** - با داده‌های پایدار
- **Node.js Application** - اپلیکیشن اصلی
- **Prisma Studio** - رابط گرافیکی برای مدیریت دیتابیس
- **Automatic Setup** - همه چیز خودکار اجرا می‌شه

## 🚀 Quick Start

### 1. روی سرور:
```bash
# Clone کنید
git clone <your-repo>
cd backend

# همه سرویس‌ها رو بالا بیارید
make build
# یا
docker-compose up -d --build
```

### 2. چک کنید:
```bash
# وضعیت سرویس‌ها
make status

# لاگ‌ها
make logs
```

## 🔧 Available Commands

```bash
make help          # همه دستورات
make up            # start همه سرویس‌ها
make down          # stop همه سرویس‌ها
make build         # build و start
make logs          # لاگ‌ها
make status        # وضعیت سرویس‌ها
make info          # اطلاعات اتصال
make restart       # restart همه
make clean         # پاک کردن همه
```

## 🌐 Access Services

- **App**: http://your-server-ip:3000
- **Prisma Studio**: http://your-server-ip:5555
- **Database**: localhost:5432 (internal)

## 📋 Connection Information

### Database Connection String:
```
postgresql://postgres:postgres123@localhost:5432/mane_haghighi_db
```

### Environment Variables:
```bash
POSTGRES_DB=mane_haghighi_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
APP_PORT=3000
NODE_ENV=production
```

## 🔄 What Happens Automatically

1. **PostgreSQL** database starts
2. **App** installs dependencies
3. **Prisma** generates client
4. **Database** schema is created
5. **App** starts in production mode
6. **Prisma Studio** opens for database management

## 🐛 Troubleshooting

### Check logs:
```bash
make logs
make logs-app
make logs-db
```

### Restart services:
```bash
make restart
make restart-app
```

### Reset everything:
```bash
make clean
make build
```

## 📝 Notes

- همه چیز با Docker containerized شده
- دیتابیس خودکار ساخته می‌شه
- داده‌ها در volume ذخیره می‌شن
- سرویس‌ها automatic restart می‌شن
- Health checks برای همه سرویس‌ها فعال

## 🌍 For Frontend Connection

Frontend شما می‌تونه به این آدرس‌ها وصل بشه:

```javascript
// API Base URL
const API_BASE_URL = 'http://your-server-ip:3000';

// Health Check
fetch('http://your-server-ip:3000/health');

// API Endpoints
fetch('http://your-server-ip:3000/auth/login', {
  method: 'POST',
  // ... your data
});
```
