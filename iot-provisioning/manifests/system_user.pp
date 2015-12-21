class iot_infrastructure::system_user inherits iot_infrastructure {

    $username = $::iot_infrastructure::system_username
    $usergroup = $::iot_infrastructure::system_usergroup
    $user_home = $::iot_infrastructure::system_user_home

    group { $usergroup:
        ensure => present,
        system => true
    }

    user { $username:
        ensure => present,
        name => $username,
        gid => $usergroup,
        shell => '/bin/bash',
        password => '*',
        home => $user_home,
        system => true,
        managehome => true,
        comment => "$username system user",
        require => Group[$usergroup]
    }

}
