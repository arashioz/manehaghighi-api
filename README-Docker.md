# Docker Setup for Mane Haghighi Backend

## 🚀 Quick Start

### 1. Start all services
```bash
make up
# or
docker-compose up -d
```

### 2. View logs
```bash
make logs
# or
docker-compose logs -f
```

### 3. Stop all services
```bash
make down
# or
docker-compose down
```

## 📊 Database Access

### Prisma Studio (Web Interface)
```bash
make studio
```
Then open: http://localhost:5555

### Direct Database Access
```bash
make shell-db
# or
docker-compose exec postgres psql -U postgres -d mane_haghighi_db
```

### Connection Details
- **Host**: localhost
- **Port**: 5432
- **Database**: mane_haghighi_db
- **Username**: postgres
- **Password**: postgres123

## 🔧 Available Commands

```bash
make help          # Show all available commands
make up            # Start services
make down          # Stop services
make build         # Build and start services
make logs          # Show all logs
make logs-app      # Show app logs only
make logs-db       # Show database logs only
make migrate       # Run database migrations
make studio        # Open Prisma Studio
make shell-db      # Database shell
make shell-app     # App container shell
make reset-db      # Reset database (WARNING: deletes all data)
make seed          # Seed database with sample data
make clean         # Remove all containers and volumes
```

## 🌐 Services

- **App**: http://localhost:3000
- **Prisma Studio**: http://localhost:5555
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 📁 File Structure

```
├── docker-compose.yml              # Main Docker configuration
├── docker-compose.override.yml     # Development overrides
├── Dockerfile                      # App container definition
├── scripts/
│   └── migrate.sh                 # Migration script
├── prisma/
│   ├── schema.prisma              # Database schema
│   ├── init.sql                   # Database initialization
│   └── migrations/                # Database migrations
└── Makefile                       # Convenience commands
```

## 🔄 Development Workflow

1. **Start services**: `make up`
2. **View logs**: `make logs-app`
3. **Make changes** to your code
4. **Restart app**: `docker-compose restart app`
5. **Stop services**: `make down`

## 🐛 Troubleshooting

### Database connection issues
```bash
make shell-db
# Check if database is running
```

### App not starting
```bash
make logs-app
# Check for errors
```

### Reset everything
```bash
make clean
make build
```

## 📝 Environment Variables

All environment variables are set in the docker-compose files:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: JWT signing secret
- `PORT`: Application port
- `NODE_ENV`: Environment (development/production)
