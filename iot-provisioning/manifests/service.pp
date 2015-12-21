class iot_infrastructure::service inherits iot_infrastructure {

    $dockerfiles_dir = $::iot_infrastructure::dockerfiles_dir
    $system_username = $::iot_infrastructure::system_username
    $docker_compose_exec_timeout =
        $::iot_infrastructure::docker_compose_exec_timeout

    exec { 'docker-compose':
        command => 'docker-compose up -d',
        path => '/usr/bin:/usr/sbin:/bin:/usr/local/bin',
        environment => [
            "COMPOSE_FILE=$dockerfiles_dir/docker-compose.yml"
        ],
        user => $system_username,
        timeout => $docker_compose_exec_timeout
    }

}
