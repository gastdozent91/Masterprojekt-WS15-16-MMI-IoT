# Installation Production

### Puppet
```bash
# Become root
$ sudo -i or su -

$ apt-get update && apt-get upgrade
$ apt-get install puppet curl vim

# Install iot module
$ puppet module install maasch-iot_provisioning

# Create manifest for current node (masterless puppet)
$ vim /etc/puppet/manifests/site.pp
```

#### Content of site.pp
```puppet
node default {
  class { 'iot_provisioning':
          system_username => 'iot',
          system_user_home => '/home/iot',
          iot_repo => 'https://github.com/TomWieschalla/Masterprojekt-WS15-16-MMI-IoT.git',
          iot_repo_clone_dir => '/home/iot/iot-app'
        }
}
```

```bash
# Apply the manifest to current node
$ puppet apply /etc/puppet/manifests/site.pp
```

### NodeJS

In `iot-frontend/build/` is an example credentials file `example_aws_config.json`.
If you need to add AWS credentials for using the cloud add a `aws_config.json`
file with you credentials. If you save them in this file your credentials will
not be uploaded to git.

### Build WAR

```bash
$ sudo su - iot or su - iot
$ cd /home/iot/iot-app/iot-backend
$ cp ./docs/resources/example-application-production.properties \
  ./iot-friss/src/main/resources/application-production.properties

# ADVICE
# -----------------
# Change credentials in application-production.properties
# -----------------
```

```bash
$ cd home/iot/iot-app/iot-backend
$ ./gradlew :iot-friss:war
```
The WAR archive is resided in ./iot-friss/build/libs.
This directory is mounted as a data volume to the Tomcat Docker container.

### Docker
```bash
# Become iot system user
$ sudo su - iot or su - iot

$ cd /home/iot/iot-app/iot-infrastructure

# ADVICE
# -----------------
# - Change credentials in docker-compose-production.yml and tomcat-users.xml
# - If ${{iot_repo_clone_dir}} was changed, please change paths
#   in docker-compose.prod.yml (nodejs -> build, tomcat -> volumes)
# -----------------

# Start all containers
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# View running containers
$ docker ps

# Stop all containers
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml stop
```

### Access the system

By default the overall system uses the following ports:

| Port  | Subsystem                   |
| ----- |:---------------------------:|
| 3000  | NodeJS (Frontend)           |
| 8000  | DynamoDB                    |
| 8080  | Tomcat                      |
| 5672  | RabbitMQ - AMQP             |
| 15672 | RabbitMQ - Management Plugin|
| 15674 | RabbitMQ - Web-Stomp Plugin |
