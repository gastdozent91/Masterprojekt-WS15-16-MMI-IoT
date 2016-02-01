class iot_provisioning::config inherits iot_provisioning {

    $iot_repo = $::iot_provisioning::iot_repo
    $iot_repo_clone_dir = $::iot_provisioning::iot_repo_clone_dir
    $system_username = $::iot_provisioning::system_username
    $system_usergroup= $::iot_provisioning::system_usergroup

    vcsrepo { $iot_repo_clone_dir:
        ensure => latest,
        provider => git,
        source => $iot_repo,
        revision => master,
        owner => $system_username,
        group => $system_usergroup
    }

}
