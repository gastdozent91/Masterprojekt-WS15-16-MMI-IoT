# iot_provisioning

Puppet module for installing and configuring the infrastructure for Masterproject (MI) Beuth - Hoefig WS15/16

## Module Description

Installs:
* git
* docker 1.9.1
* docker-compose 1.5.1
* oracle-jdk-8

Affects:

* create system user

## Support

This module is currently tested on:

* Debian 8.0 Jessie

Compatibility With Puppet >= 3.4.0

## Usage

~~~
class { 'iot_provisioning':
    system_username => 'iot',
    system_user_home => '/home/iot',
    iot_repo => 'https://github.com/TomWieschalla/Masterprojekt-WS15-16-MMI-IoT.git',
    iot_repo_clone_dir => '/home/iot/iot-app',
}
~~~
