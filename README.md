# Installation Production

### Puppet
```sh
# Become root
$ sudo -i or su -

$ apt-get update && apt-get upgrade
$ apt-get install puppet curl

# Install iot module
$ puppet module install maasch-iot_provisioning

# Create manifest for current node (masterless puppet)
$ vi /etc/puppet/manifests/site.pp
```

#### Content of site.pp
```puppet
node default {
  class { 'iot_provisioning':
          system_username => 'iot',
          system_user_home => '/home/iot',
          iot_repo => 'https://github.com/TomWieschalla/Masterprojekt-WS15-16-MMI-IoT.git',
          iot_repo_clone_dir => '/home/iot/iot-app',      
        }
}
```

```bash
# Apply the manifest to current node
$ puppet apply /etc/puppet/manifests/site.pp
```

### NodeJS

TODO: 

### Build WAR

```bash
$ sudo su - ${{system_username}} or su - ${{system_username}}
$ cd ${{iot_repo_clone_dir}}/iot-backend
$ cp ./docs/resources/example-application-production.properties \
  ./iot-friss/src/main/resources/application-production.properties

# ADVICE
# -----------------
# Change credentials in application-production.properties
# -----------------
```

```bash
$ cd ${{iot_repo_clone_dir}}/iot-backend
$ ./gradlew :iot-friss:war
```
The WAR archive is resided in ./iot-friss/build/libs.
This directory is mounted as a data volume to the Tomcat Docker container.

### Docker
```bash
$ sudo su - ${{system_username}} or su - ${{system_username}}
$ cd ${{iot_repo_clone_dir}}/iot-infrastructure

# ADVICE
# -----------------
# - Change credentials in docker-compose-production.yml and tomcat-users.xml
# - If ${{iot_repo_clone_dir}} was changed, please change paths
#   in docker-compose.prod.yml (nodejs -> build, tomcat -> volumes)
# -----------------

# Start all containers
$ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Stop all containers
$ docker-compose stop

```
