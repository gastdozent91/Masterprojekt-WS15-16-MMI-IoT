Masterprojekt

## Prerequisites

* JDK 8
* Docker
* Set `JAVA_HOME` to your JDK 8 installation folder

## Run system local

    $ docker run -d -p 5672:5672 --hostname mmi-rabbit --name mmi-rabbit rabbitmq:3
    $ ./gradlew tomcatRunWar