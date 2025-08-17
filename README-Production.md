# 🚀 Production Deployment Guide

## 📋 Prerequisites

- Docker and Docker Compose installed on your server
- Git access to your repository
- Domain name (optional, for SSL setup)
- Server with at least 2GB RAM and 20GB storage

## 🚀 Quick Deployment

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd backend
```

### 2. Environment Configuration
Create a `.env.production` file:
```bash
# Database
POSTGRES_DB=mane_haghighi_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_PORT=5432

# Redis
REDIS_PORT=6379

# Application
APP_PORT=3000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Nginx (optional)
NGINX_PORT=80
NGINX_SSL_PORT=443
```

### 3. Deploy
```bash
# Option 1: Using deployment script
./scripts/deploy.sh

# Option 2: Using Makefile
make -f Makefile.prod deploy

# Option 3: Manual deployment
docker-compose -f docker-compose.prod.yml up -d --build
```

## 🔧 Available Commands

```bash
# Production commands
make -f Makefile.prod help          # Show all commands
make -f Makefile.prod deploy        # Full deployment
make -f Makefile.prod build-prod    # Build images only
make -f Makefile.prod up-prod       # Start services
make -f Makefile.prod down-prod     # Stop services
make -f Makefile.prod logs-prod     # View logs
make -f Makefile.prod monitor       # Monitor services
make -f Makefile.prod backup        # Database backup
make -f Makefile.prod migrate-prod  # Run migrations
make -f Makefile.prod update        # Update application
```

## 🌐 Service Access

- **Application**: http://your-server-ip:3000
- **Nginx Proxy**: http://your-server-ip:80 (if enabled)
- **Database**: localhost:5432 (internal)
- **Redis**: localhost:6379 (internal)

## 📊 Monitoring

### Service Status
```bash
make -f Makefile.prod monitor
```

### View Logs
```bash
# All services
make -f Makefile.prod logs-prod

# Application only
make -f Makefile.prod logs-app-prod

# Database only
make -f Makefile.prod logs-db-prod
```

### Health Check
```bash
curl http://your-server-ip:3000/health
```

## 🔄 Updates and Maintenance

### Update Application
```bash
make -f Makefile.prod update
```

### Database Backup
```bash
make -f Makefile.prod backup
```

### Restore Database
```bash
make -f Makefile.prod restore BACKUP_FILE=backups/backup_20240101_120000.sql
```

## 🔒 Security Features

- **Rate Limiting**: API endpoints (10 req/s), Auth endpoints (5 req/min)
- **Security Headers**: XSS protection, CSRF protection, Content Security Policy
- **Non-root User**: Application runs as non-root user
- **Health Checks**: Automatic health monitoring
- **SSL Ready**: Nginx configuration for HTTPS

## 🌐 Nginx Configuration

The production setup includes Nginx as a reverse proxy with:
- Rate limiting
- Gzip compression
- Security headers
- SSL support (configured but commented out)

### Enable SSL
1. Get SSL certificates (Let's Encrypt recommended)
2. Place certificates in `nginx/ssl/` directory
3. Uncomment SSL section in `nginx/nginx.conf`
4. Update domain name in configuration

## 🐛 Troubleshooting

### Common Issues

#### Service won't start
```bash
# Check logs
make -f Makefile.prod logs-prod

# Check service status
make -f Makefile.prod monitor
```

#### Database connection issues
```bash
# Check database logs
make -f Makefile.prod logs-db-prod

# Check database health
docker-compose -f docker-compose.prod.yml exec postgres pg_isready -U postgres
```

#### Application errors
```bash
# Check application logs
make -f Makefile.prod logs-app-prod

# Restart application
docker-compose -f docker-compose.prod.yml restart app
```

### Reset Everything
```bash
make -f Makefile.prod clean-prod
make -f Makefile.prod deploy
```

## 📈 Performance Optimization

- **Multi-stage Docker build** for smaller images
- **Alpine Linux** base images for security and size
- **Nginx reverse proxy** with caching and compression
- **Redis** for session storage and caching
- **Health checks** for automatic recovery

## 🔍 Logging

Logs are available through:
- Docker Compose logs
- Container logs
- Application logs

### Log Rotation
Consider setting up log rotation for production:
```bash
# Add to your server's crontab
0 0 * * * docker system prune -f
```

## 📞 Support

For issues and questions:
1. Check logs first: `make -f Makefile.prod logs-prod`
2. Check service status: `make -f Makefile.prod monitor`
3. Review this documentation
4. Check Docker and Docker Compose documentation
