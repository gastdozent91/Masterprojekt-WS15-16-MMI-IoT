# iot-infrastructure

## Setup

[Install Docker Compose](https://docs.docker.com/compose/install/)

## Usage

### Docker Compose (Development)

```bash
# Start all containers detached
docker-compose up -d

# Stop all containers
docker-compose stop
```

In development only RabbitMQ and DynamoDB be started because we are working with Gradle Tomcat Plugin and local NodeJS installation.

### Docker Compose (Production)

```bash
# Start all containers detached
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Stop all containers
docker-compose stop
```

## Links
- [Compose CLI reference](https://docs.docker.com/compose/reference/)
- [Extending services and Compose files](https://docs.docker.com/compose/extends/)
- [Gradle Tomcat Plugin](https://github.com/bmuschko/gradle-tomcat-plugin)
