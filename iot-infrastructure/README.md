# iot-infrastructure

## Setup

[Install Docker Compose](https://docs.docker.com/compose/install/)

## Usage

### Docker Compose

```bash
# Start all containers detached
docker-compose up -d

# Stop all containers
docker-compose stop
```

## Start single container

### DynamoDB
```bash
# Build image
docker build -t iot/dynamodb docker/dynamodb-local

# Run in foreground
docker run -it --rm -p 8000:8000 --name iot-dynamodb iot/dynamodb

# Run detached
docker run -d -p 8000:8000 --name iot-dynamodb iot/dynamodb
```
### RabbitMQ

```bash
# Build image
docker build -t iot/rabbitmq docker/rabbitmq

# Run in foreground
docker run -it --rm -p 5672:5672 -p 15672:15672 -p 15674:15674 \
--hostname iot-rabbit --name iot-rabbit iot/rabbitmq

# Run detached
docker run -d -p 5672:5672 -p 15672:15672 -p 15674:15674 \
--hostname iot-rabbit --name iot-rabbit iot/rabbitmq
```

### NodeJS

Follows

### Tomcat

```bash
# Build image
docker build -t iot/tomcat docker/tomcat

# Run in foreground
docker run -it --rm -p 8080:8080 --name iot-tomcat iot/tomcat

# Run detached
docker run -d -p 8080:8080 --name iot-tomcat iot/tomcat
```

## Links
- [Compose CLI reference](https://docs.docker.com/compose/reference/)
- [RabbitMQ Web-Stomp Plugin](https://www.rabbitmq.com/web-stomp.html)
