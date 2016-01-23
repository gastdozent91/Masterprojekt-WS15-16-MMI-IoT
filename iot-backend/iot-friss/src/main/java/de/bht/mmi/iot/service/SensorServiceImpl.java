package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.dto.SensorPutDto;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.rest.Gateway;
import de.bht.mmi.iot.model.rest.Sensor;
import de.bht.mmi.iot.model.rest.User;
import de.bht.mmi.iot.repository.SensorRepository;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.Collections;

@Service
public class SensorServiceImpl implements SensorService {


    Logger LOGGER = LoggerFactory.getLogger(SensorServiceImpl.class);

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private GatewayService gatewayService;

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
        final Iterable<Sensor> userSensors = sensorRepository.findAll(user.getSensorList());
        return userSensors != null ? userSensors : Collections.emptyList();
    }

    @Override
    public Iterable<Sensor> getAllSensorsByGatewayId(String gatewayId) throws EntityNotFoundException {
        final Gateway gateway = gatewayService.getGateway(gatewayId);
        return sensorRepository.findByAttachedGateway(gatewayId);
    }

    @Override
    public Sensor createSensor(@Validated SensorPostDto sensor, UserDetails authenticatedUser)
            throws EntityNotFoundException {
        gatewayService.getGateway(sensor.getAttachedGateway());
        final Sensor newSensor = new Sensor(
                sensor.getSensorType(),
                sensor.getLocation(),
                sensor.getAttachedGateway(),
                sensor.getAttachedClusters(),
                authenticatedUser.getUsername(),
                new DateTime(),sensor.isActive()
        );
        newSensor.setName(sensor.getName());
        return sensorRepository.save(newSensor);
    }

    @Override
    public Sensor updateSensor(String sensorId, @Validated SensorPutDto sensor, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        gatewayService.getGateway(sensor.getAttachedGateway());
        final Sensor oldSensor = getSensor(sensorId);
        final User user = userService.loadUserByUsername(authenticatedUser.getUsername());
        if (user.getRoles().contains(RoleConstants.ROLE_ADMIN)){
            oldSensor.setActive(sensor.isActive());
            oldSensor.setLocation(sensor.getLocation());
            oldSensor.setSensorType(sensor.getSensorType());
            oldSensor.setAttachedGateway(sensor.getAttachedGateway());
            oldSensor.setAttachedClusters(sensor.getAttachedClusters());
            oldSensor.setOwner(sensor.getOwner());
            oldSensor.setName(sensor.getName());
            return sensorRepository.save(oldSensor);
        } else if (oldSensor.getOwner().equals(authenticatedUser.getUsername())) {
            oldSensor.setActive(sensor.isActive());
            oldSensor.setLocation(sensor.getLocation());
            oldSensor.setSensorType(sensor.getSensorType());
            oldSensor.setAttachedClusters(sensor.getAttachedClusters());
            oldSensor.setName(sensor.getName());
            return sensorRepository.save(oldSensor);
        } else {
            throw new NotAuthorizedException(String.format("You are not authorized to access sensor with id '%s'", sensorId));
        }
    }

    @Override
    public void deleteSensor(String sensorId) throws EntityNotFoundException {
        final Sensor sensor = getSensor(sensorId);
        sensorRepository.delete(sensorId);
        LOGGER.debug(String.format("Sensor with id '%s' deleted", sensorId));
    }

}
