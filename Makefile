DEV_COMPOSE_FILE := docker-compose.dev.yml
PROD_COMPOSE_FILE := docker-compose.yml
PROJECT_NAME_DEV := patients_dev
PROJECT_NAME_PROD := patients_prod

.PHONY: up down logs-prod build-prod

up:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME_PROD) up --build -d

down:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME_PROD) down

logs:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME_PROD) logs -f

build:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME_PROD) build
