class iot_infrastructure::config inherits iot_infrastructure {

    $dockerfiles_dir = $::iot_infrastructure::dockerfiles_dir
    $dockerfiles_repo = $::iot_infrastructure::dockerfiles_repo
    $system_username = $::iot_infrastructure::system_username
    $system_usergroup= $::iot_infrastructure::system_usergroup

    vcsrepo { $dockerfiles_dir:
        ensure => latest,
        provider => git,
        source => $dockerfiles_repo,
        revision => master,
        owner => $system_username,
        group => $system_usergroup
    }

}
