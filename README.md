Masterprojekt

## Prerequisites

* JDK 8
* Docker
* Set `JAVA_HOME` to your JDK 8 installation folder

## Run system local

    $ docker run -d --hostname my-rabbit --name some-rabbit rabbitmq:3
    $ ./gradlew tomcatRunWar