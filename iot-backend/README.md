# iot-friss

## Prerequisites to run local

* JDK 8
* Docker
* [Docker Compose](https://docs.docker.com/compose/)
* Set `JAVA_HOME` to a local JDK 8 installation


Copy [example-application-development.properties](./docs/resources/example-application-development.properties) and
[example-application-production.properties](./docs/resources/example-application-production.properties) to
[./iot-friss/src/main/resources/](./iot-friss/src/main/resources/),
rename them to application-development.properties resp. application-production.properties
and customize values like credentials.

## Usage

### Start in local Tomcat

    ./gradlew friss
    or
    ./gradlew :iot-friss:tomcatRunWar

### Unit tests

    ./gradlew :iot-friss:test -i

### Build WAR

    ./gradle :iot-friss:war

The WAR archive is resided in iot-friss/build/libs.

### Generator (Java)

DEPRECATED: Please use the Python Generator (iot-pyGenerator)

## Common problems

### Required key [...] not found

Please check the spelling of the keys in application-\*.properties.
If required key is missing, please compare application-\*.properties
with the exmaple-application-\*.properties and copy missing key-value pairs.

### Connection Refused Exception on Mac
```bash
# Docker terminal
$ docker-machine ip default

# resources/application-*.properties -> Change localhost with ip
```

## Useful links, infos, programms etc.
* [AMQP Model - RabbitMQ](https://www.rabbitmq.com/tutorials/amqp-concepts.html)
* [Spring AMQP](http://docs.spring.io/spring-amqp/reference/html/)
* [Docker Hub - RabbitMQ](https://hub.docker.com/_/rabbitmq/)
* [Postman - REST Client](https://www.getpostman.com/)
