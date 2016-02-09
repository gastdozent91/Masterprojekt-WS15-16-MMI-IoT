class iot_provisioning::params {
    $system_username = 'iot'
    $system_usergroup = $system_username
    $system_user_home = "/home/$system_username"
    $iot_repo = 'https://github.com/TomWieschalla/Masterprojekt-WS15-16-MMI-IoT.git'
    $iot_repo_clone_dir = $system_user_home
    $iot_repo_frontend_subdir = '/iot-frontend'
    $iot_repo_docker_compose_subdir = '/iot-infrastructure'
    $docker_version = '1.9.1-0~jessie'
    $docker_compose_version = '1.5.1'
}
