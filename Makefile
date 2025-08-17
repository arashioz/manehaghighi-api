.PHONY: help up down build logs clean migrate studio shell-db shell-app

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

build: ## Build and start services
	docker-compose up -d --build

logs: ## Show logs for all services
	docker-compose logs -f

logs-app: ## Show logs for app service
	docker-compose logs -f app

logs-db: ## Show logs for database service
	docker-compose logs -f postgres

clean: ## Remove all containers, networks, and volumes
	docker-compose down -v --remove-orphans
	docker system prune -f

migrate: ## Run database migrations
	docker-compose exec app npx prisma migrate deploy

studio: ## Open Prisma Studio
	docker-compose exec app npx prisma studio --hostname 0.0.0.0 --port 5555

shell-db: ## Open shell in database container
	docker-compose exec postgres psql -U postgres -d mane_haghighi_db

shell-app: ## Open shell in app container
	docker-compose exec app sh

reset-db: ## Reset database (WARNING: This will delete all data)
	docker-compose exec app npx prisma migrate reset --force

seed: ## Seed database with sample data
	docker-compose exec app npm run seed
