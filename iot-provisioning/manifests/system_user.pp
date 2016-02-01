class iot_provisioning::system_user inherits iot_provisioning {

    $username = $::iot_provisioning::system_username
    $usergroup = $::iot_provisioning::system_usergroup
    $user_home = $::iot_provisioning::system_user_home

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
        comment => 'iot system user',
        require => Group[$usergroup]
    }

}
