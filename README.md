#Masterprojekt

## Prerequisites to run local

* JDK 8
* Docker
* Set `JAVA_HOME` to a local JDK 8 installation

## Setup IDE

* Install [Lombok](https://projectlombok.org/download.html)

## Run system local

    $ docker run -d -p 5672:5672 --hostname mmi-rabbit --name mmi-rabbit rabbitmq:3
    $ ./gradlew tomcatRunWar
    
Call Test-REST-Controller and watch console

    http://localhost:8080/iot/send/bar
    http://localhost:8080/iot/send/topic
    http://localhost:8080/iot/send/test
    
## Docker usage
Pull image and start container

    $ docker run -d -p 5672:5672 --hostname mmi-rabbit --name mmi-rabbit rabbitmq:3

Start container
    
    $ docker start mmi-rabbit
    
Stop container

    $ docker stop mmi-rabbit
    
Other useful docker commands

    $ docker ps -a # Show all containers
    $ docker images # Show all images
    $ docker rm CONTAINER # Remove CONTAINER
    $ docker top CONTAINER # Display running processes of CONTAINER

    
## Useful links, infos, programms etc.
* [AMQP Model - RabbitMQ](https://www.rabbitmq.com/tutorials/amqp-concepts.html)
* [Spring AMQP](http://docs.spring.io/spring-amqp/reference/html/)
* [Docker Hub - RabbitMQ](https://hub.docker.com/_/rabbitmq/)
* [Postman - REST Client](https://www.getpostman.com/)