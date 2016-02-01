# Class: iot_provisioning
# ===========================
#
# Module to install the iot-iot_provisioning
#
# Parameters
# ----------
#
# Document parameters here.
#
# * `system_username`
#   Explanation of what this parameter affects and what it defaults to.
#   e.g. "Specify one or more upstream ntp servers as an array."
#
# * `system_user_home`
#   Explanation of what this parameter affects and what it defaults to.
#   e.g. "Specify one or more upstream ntp servers as an array."
#
# * `iot_repo`
#   Explanation of what this parameter affects and what it defaults to.
#   e.g. "Specify one or more upstream ntp servers as an array."
#
# * `iot_repo_clone_dir`
#   Explanation of what this parameter affects and what it defaults to.
#   e.g. "Specify one or more upstream ntp servers as an array."
#
# Examples
# --------
#
# @example
#    class { 'iot_provisioning':
#      system_username => 'iot',
#      system_user_home => '/home/iot',
#      iot_repo => 'https://github.com/TomWieschalla/Masterprojekt-WS15-16-MMI-IoT.git',
#      iot_repo_clone_dir => '/home/iot/iot-app',
#    }
#
# Authors
# -------
#
# Steven Maasch <steven.maasch@gmx.de>
#
# Copyright
# ---------
#
# Copyright 2015 Steven Maasch
#
class iot_provisioning (
  $system_username = $::iot_provisioning::params::system_username,
  $system_user_home = $::iot_provisioning::params::system_user_home,
  $iot_repo = $::iot_provisioning::params::iot_repo,
  $iot_repo_clone_dir = $::iot_provisioning::params::iot_repo_clone_dir
) inherits iot_provisioning::params {

    class { 'jdk_oracle':
      version => 8,
      default_java => true
    }
    class { 'git': } ~>
    class { 'docker':
        docker_users => [ $system_username ],
        socket_group => 'docker'
    } ~>
    class { 'docker_compose': }

    contain 'iot_provisioning::install'
    contain 'iot_provisioning::config'

}
