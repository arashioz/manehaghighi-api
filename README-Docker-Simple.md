# 🐳 Simple Docker Setup

## 🚀 Quick Start

### 1. Create environment file
```bash
# Copy example file
cp .env.example .env

# Edit with your values
nano .env
```

### 2. Start everything
```bash
# Development (with hot reload)
make dev

# Production
make prod

# Or use docker-compose directly
docker-compose up -d
```

## 🔧 Available Commands

```bash
# Development
make dev              # Start development environment
make dev-build        # Build and start development

# Production
make prod             # Start production environment
make prod-build       # Build and start production

# General
make up               # Start services
make down             # Stop services
make build            # Build and start
make logs             # View logs
make status           # Show service status
make restart          # Restart all services
make env              # Show environment config
```

## 🌐 Access Services

- **App**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555
- **Database**: localhost:5432
- **Redis**: localhost:6379

## ⚙️ Environment Variables

Create a `.env` file with these variables:

```bash
# Database
POSTGRES_DB=mane_haghighi_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_PORT=5432

# Redis
REDIS_PORT=6379

# Application
APP_PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key

# Prisma Studio
PRISMA_STUDIO_PORT=5555
```

## 🔄 What Happens Automatically

1. **PostgreSQL** database starts
2. **Redis** cache starts
3. **App** installs dependencies
4. **Prisma** generates client
5. **Database** schema is pushed
6. **App** starts in development mode
7. **Prisma Studio** opens for database management

## 🐛 Troubleshooting

### Check logs
```bash
make logs
make logs-app
make logs-db
```

### Restart services
```bash
make restart
make restart-app
```

### Reset everything
```bash
make clean
make dev
```

### Check status
```bash
make status
make env
```

## 📝 Notes

- All services use environment variables with sensible defaults
- Database automatically creates tables from Prisma schema
- Hot reload works in development mode
- Prisma Studio gives you a web interface to manage data
- Everything is containerized and isolated
