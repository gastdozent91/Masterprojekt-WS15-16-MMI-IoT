class iot_infrastructure::install inherits iot_infrastructure {

    $system_username = $::iot_infrastructure::system_username
    $system_usergroup = $::iot_infrastructure::system_usergroup
    $system_user_home = $::iot_infrastructure::system_user_home
    $dockerfiles_dir = $::iot_infrastructure::dockerfiles_dir

    contain 'git'
    contain 'docker'
    contain 'docker_compose'

    contain 'iot_infrastructure::system_user'

    file { $system_user_home:
        ensure => directory,
        owner => $system_username
    }

    file { $dockerfiles_dir:
        ensure => directory,
        owner => $system_username,
        group => $system_usergroup
    }

}
