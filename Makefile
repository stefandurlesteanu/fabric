DEV_COMPOSE_FILE := docker-compose.dev.yml
PROD_COMPOSE_FILE := docker-compose.yml
PROJECT_NAME_DEV := patients_dev
PROJECT_NAME_PROD := patients_prod

.PHONY: up-dev down-dev up-prod down-prod logs-dev logs-prod build-dev build-prod

up-dev:
	@docker-compose -f $(DEV_COMPOSE_FILE) -p $(PROJECT_NAME_DEV) up --build -d

down-dev:
	@docker-compose -f $(DEV_COMPOSE_FILE) -p $(PROJECT_NAME_DEV) down

logs-dev:
	@docker-compose -f $(DEV_COMPOSE_FILE) -p $(PROJECT_NAME_DEV) logs -f

build-dev:
	@docker-compose -f $(DEV_COMPOSE_FILE) -p $(PROJECT_NAME_DEV) build

up-prod:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME_PROD) up --build -d

down-prod:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME_PROD) down

logs-prod:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME_PROD) logs -f

build-prod:
	@docker-compose -f $(PROD_COMPOSE_FILE) -p $(PROJECT_NAME_PROD) build
