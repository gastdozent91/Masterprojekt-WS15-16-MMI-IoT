# iot-friss

## Prerequisites to run local

* JDK 8
* Docker
* Set `JAVA_HOME` to a local JDK 8 installation

## Useful links, infos, programms etc.
* [AMQP Model - RabbitMQ](https://www.rabbitmq.com/tutorials/amqp-concepts.html)
* [Spring AMQP](http://docs.spring.io/spring-amqp/reference/html/)
* [Docker Hub - RabbitMQ](https://hub.docker.com/_/rabbitmq/)
* [Postman - REST Client](https://www.getpostman.com/)

## mac config bei "connection refused" exception
in docker terminal: docker-machine ip default
in resources/rabbit.properties:
change localhost in rabbit.host=localhost mit IP
