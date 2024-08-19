DEV_COMPOSE_FILE := docker-compose.dev.yml
PROD_COMPOSE_FILE := docker-compose.yml
PROJECT_NAME := patients

.PHONY: up down logs-prod build-prod

up:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME) up --build -d

down:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME) down

logs:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME) logs -f

build:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME) build
