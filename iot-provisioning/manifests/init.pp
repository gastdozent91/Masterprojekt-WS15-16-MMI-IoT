# Class: iot_infrastructure
# ===========================
#
# Module to install the iot-iot_infrastructure
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
# * `dockerfiles_repo`
#   Explanation of what this parameter affects and what it defaults to.
#   e.g. "Specify one or more upstream ntp servers as an array."
#
# * `dockerfiles_dir`
#   Explanation of what this parameter affects and what it defaults to.
#   e.g. "Specify one or more upstream ntp servers as an array."
#
# Examples
# --------
#
# @example
#    class { 'iot_infrastructure':
#      system_username => 'iot',
#      system_user_home => '/home/iot',
#      dockerfiles_repo => 'https://github.com/steven-maasch/mmi-iot-infrastructure.git',
#      dockerfiles_dir => '/home/iot/iot-docker',
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
class iot_infrastructure (
    $system_username = $::iot_infrastructure::params::system_username,
    $system_user_home = $::iot_infrastructure::params::system_user_home,
    $dockerfiles_repo = $::iot_infrastructure::params::dockerfiles_repo,
    $dockerfiles_dir = $::iot_infrastructure::params::dockerfiles_dir
) inherits iot_infrastructure::params {

    class { 'git': } ~>
    class { 'docker':
        docker_users => [ $system_username ],
        socket_group => 'dockerroot' # TODO:
    } ~>
    class { 'docker_compose': }

    contain 'iot_infrastructure::install'
    contain 'iot_infrastructure::config'
    contain 'iot_infrastructure::service'

}
