# Installation

### Puppet
```sh
$ sudo -i or su -

# Install puppet
$ apt-get install puppet

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
          iot_repo_clone_dir => '/home/iot/iot-app',      
        }
}
```

```sh
# Apply the manifest to current node
$ puppet apply /etc/puppet/manifests/site.pp
```

### Docker
```sh
$ sudo su - ${{system_username}} or su - ${{system_username}}
$ cd ${{iot_repo_clone_dir}}/iot-infrastructure

# SECURITY ADVICE
# ----------------
# Change credentials, path to iot-frontend/Dockerfile etc in docker-compose.yml and tomcat-users.xml

# Start all containers
$ docker-compose up -d

# Stop all containers
$ docker-compose stop

```

## Build and deploy WAR

TODO:
