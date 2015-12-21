class iot_infrastructure::params {
    $system_username = 'iot'
    $system_usergroup = $system_username
    $system_user_home = "/home/$system_username"
    $dockerfiles_dirname = "iot-docker"
    $dockerfiles_dir = "$system_user_home/$dockerfiles_dirname"
    $dockerfiles_repo = 'https://github.com/steven-maasch/mmi-iot-infrastructure.git'
    $docker_compose_exec_timeout = 600
}
