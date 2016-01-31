package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class SensorServiceImpl implements SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private GatewayService gatewayService;

    @Autowired
    private ClusterService clusterService;

    @Override
    public Iterable<Sensor> getAll() {
        return sensorRepository.findAll();
    }

    @Override
    public Sensor getSensor(String sensorId) throws EntityNotFoundException {
        Sensor sensor = sensorRepository.findOne(sensorId);
        if (sensor != null) {
            return sensor;
        } else {
            throw new EntityNotFoundException(String.format("Sensor with id '%s' not found!", sensorId));
        }
    }

    @Override
    public Iterable<Sensor> getAllSensorsByUsername(String username, User authenticatedUser)
            throws NotAuthorizedException, EntityNotFoundException {
        final User user = userService.loadUserByUsername(username, authenticatedUser);
        final Iterable<Sensor> userSensors = sensorRepository.findAll(user.getSensors());
        return userSensors != null ? userSensors : Collections.emptyList();
    }

    @Override
    public Iterable<Sensor> getAllSensorsByGatewayId(String gatewayId) throws EntityNotFoundException {
        gatewayService.getGateway(gatewayId);
        return sensorRepository.findByAttachedGateway(gatewayId);
    }

    @Override
    public Iterable<Sensor> getAllSensorsByClusterId(String clusterId) throws EntityNotFoundException {
        clusterService.getCluster(clusterId);
        return sensorRepository.findByAttachedCluster(clusterId);
    }

    @Override
    public Sensor createSensor(Sensor sensor) throws EntityNotFoundException, NotAuthorizedException {
        userService.loadUserByUsername(sensor.getOwner());
        clusterService.getCluster(sensor.getAttachedCluster());
        gatewayService.getGateway(sensor.getAttachedGateway());
        return sensorRepository.save(sensor);
    }

    @Override
    public Sensor updateSensor(String sensorId, Sensor sensor, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        userService.loadUserByUsername(sensor.getOwner());
        clusterService.getCluster(sensor.getAttachedCluster());
        gatewayService.getGateway(sensor.getAttachedGateway());

        final Sensor oldSensor = getSensor(sensorId);
        if ((oldSensor != null && oldSensor.getOwner() == authenticatedUser.getUsername()) ||
                userService.isRolePresent(authenticatedUser, RoleConstants.ROLE_ADMIN)) {
            sensor.setId(sensorId);
            return sensorRepository.save(sensor);
        } else {
            throw new NotAuthorizedException(
                    String.format("You are not authorized to update sensor with id '%s'", sensorId));
        }
    }

    @Override
    public void deleteSensor(String sensorId) throws EntityNotFoundException {
        getSensor(sensorId);
        sensorRepository.delete(sensorId);
    }

}
