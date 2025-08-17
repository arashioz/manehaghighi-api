#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
COMPOSE_FILE="docker-compose.prod.yml"
APP_NAME="mane-haghighi-backend"

echo -e "${GREEN}🚀 Starting deployment of $APP_NAME...${NC}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Check if docker-compose.prod.yml exists
if [ ! -f "$COMPOSE_FILE" ]; then
    echo -e "${RED}❌ $COMPOSE_FILE not found. Please make sure you're in the correct directory.${NC}"
    exit 1
fi

# Stop existing services
echo -e "${YELLOW}⏹️  Stopping existing services...${NC}"
docker-compose -f $COMPOSE_FILE down || true

# Remove old images
echo -e "${YELLOW}🧹 Cleaning up old images...${NC}"
docker system prune -f

# Build new images
echo -e "${YELLOW}🔨 Building new images...${NC}"
docker-compose -f $COMPOSE_FILE build --no-cache

# Start services
echo -e "${YELLOW}🚀 Starting services...${NC}"
docker-compose -f $COMPOSE_FILE up -d

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"
sleep 30

# Check service status
echo -e "${YELLOW}📊 Checking service status...${NC}"
docker-compose -f $COMPOSE_FILE ps

# Run migrations
echo -e "${YELLOW}🔄 Running database migrations...${NC}"
docker-compose -f $COMPOSE_FILE exec -T app npx prisma migrate deploy || {
    echo -e "${RED}❌ Migration failed. Check logs with: docker-compose -f $COMPOSE_FILE logs app${NC}"
    exit 1
}

# Health check
echo -e "${YELLOW}🏥 Performing health check...${NC}"
sleep 10

if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Health check passed!${NC}"
else
    echo -e "${RED}❌ Health check failed. Check logs with: docker-compose -f $COMPOSE_FILE logs app${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Application is running at: http://localhost:3000${NC}"
echo -e "${GREEN}📊 Monitor with: make -f Makefile.prod monitor${NC}"
echo -e "${GREEN}📝 View logs with: make -f Makefile.prod logs-prod${NC}"
