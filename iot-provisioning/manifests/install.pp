class iot_provisioning::install inherits iot_provisioning {

    $system_username = $::iot_provisioning::system_username
    $system_usergroup = $::iot_provisioning::system_usergroup
    $system_user_home = $::iot_provisioning::system_user_home
    $iot_repo_clone_dir = $::iot_provisioning::iot_repo_clone_dir

    contain 'git'
    contain 'docker'
    contain 'docker_compose'

    contain 'iot_provisioning::system_user'

    file { $system_user_home:
        ensure => directory,
        owner => $system_username
    }

    file { $iot_repo_clone_dir:
        ensure => directory,
        owner => $system_username,
        group => $system_usergroup
    }
    
}
