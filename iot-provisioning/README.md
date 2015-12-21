# iot_infrastructure

#### Table of Contents

1. [Overview](#overview)
2. [Module Description - What the module does and why it is useful](#module-description)
3. [Setup - The basics of getting started with iot_infrastructure](#setup)
    * [What iot_infrastructure affects](#what-iot_infrastructure-affects)
    * [Setup requirements](#setup-requirements)
    * [Beginning with iot_infrastructure](#beginning-with-iot_infrastructure)
4. [Usage - Configuration options and additional functionality](#usage)
5. [Reference - An under-the-hood peek at what the module is doing and how](#reference)
5. [Limitations - OS compatibility, etc.](#limitations)
6. [Development - Guide for contributing to the module](#development)

## Overview

## Module Description

Installs:
* git
* docker
* docker-compose

Run docker-compose to start:
* RabbitMQ
* DynamoDB (local)
* Tomcat
* NodeJS

### What iot_infrastructure affects

* create system user
* git
* docker
* docker-compose

### Beginning with iot_infrastructure

~~~
class { 'iot_infrastructure':
    system_username => 'iot',
    system_user_home => '/home/iot',
    dockerfiles_repo => 'https://github.com/steven-maasch/mmi-iot-infrastructure.git',
    dockerfiles_dir => '/home/iot/iot-docker',
}
~~~

## Usage

## Reference

## Limitations

Compatibility with following operating systems:

* CentOS 7

Compatibility With Puppet >= 3.4.0

## Development
