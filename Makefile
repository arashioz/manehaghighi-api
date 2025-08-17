.PHONY: help up down build logs clean status info

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

up: ## Start all services
	@echo "🚀 Starting all services..."
	docker-compose up -d

down: ## Stop all services
	@echo "⏹️  Stopping all services..."
	docker-compose down

build: ## Build and start services
	@echo "🔨 Building and starting services..."
	docker-compose up -d --build

logs: ## Show logs for all services
	docker-compose logs -f

logs-app: ## Show logs for app service
	docker-compose logs -f app

logs-db: ## Show logs for database service
	docker-compose logs -f postgres

status: ## Show service status
	@echo "📊 Service Status:"
	docker-compose ps

clean: ## Remove all containers, networks, and volumes
	@echo "🧹 Cleaning up everything..."
	docker-compose down -v --remove-orphans
	docker system prune -f

info: ## Show connection information
	@echo "📋 Connection Information:"
	@echo "🌐 App: http://localhost:3000"
	@echo "📊 Prisma Studio: http://localhost:5555"
	@echo "🗄️  Database: localhost:5432"
	@echo ""
	@echo "🔗 Database Connection:"
	@echo "postgresql://postgres:postgres123@localhost:5432/mane_haghighi_db"
	@echo ""
	@echo "📝 Environment Variables:"
	@echo "POSTGRES_DB: ${POSTGRES_DB:-mane_haghighi_db}"
	@echo "POSTGRES_USER: ${POSTGRES_USER:-postgres}"
	@echo "POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres123}"
	@echo "APP_PORT: ${APP_PORT:-3000}"
	@echo "NODE_ENV: ${NODE_ENV:-production}"

restart: ## Restart all services
	@echo "🔄 Restarting all services..."
	docker-compose restart

restart-app: ## Restart only app service
	@echo "🔄 Restarting app service..."
	docker-compose restart app
