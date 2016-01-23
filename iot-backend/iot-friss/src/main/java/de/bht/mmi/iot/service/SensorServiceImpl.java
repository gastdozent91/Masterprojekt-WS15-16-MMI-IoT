package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.dto.SensorPutDto;
import de.bht.mmi.iot.model.rest.Gateway;
import de.bht.mmi.iot.model.rest.Sensor;
import de.bht.mmi.iot.model.rest.User;
import de.bht.mmi.iot.repository.GatewayRepository;
import de.bht.mmi.iot.repository.SensorRepository;
import de.bht.mmi.iot.repository.UserRepository;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;

@Service
public class SensorServiceImpl implements SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private GatewayRepository gatewayRepository;

    Logger LOGGER = LoggerFactory.getLogger(SensorServiceImpl.class);

    @Override
    public Iterable<Sensor> getAll() {
        return sensorRepository.findAll();
    }

    @Override
    public Sensor getSensor(String id) {
        Sensor sensor = sensorRepository.findOne(id);
        if (sensor != null) {
            return sensor;
        } else {
            throw new EntityNotFoundException(String.format("Sensor with id '%s' not found!",id));
        }
    }

    @Override
    public Iterable<Sensor> getAllSensorsByUsername(String username, User authenticatedUser) {
        final User user = userService.loadUserByUsername(username, authenticatedUser);
        final Iterable<Sensor> userSensors = sensorRepository.findAll(user.getSensorList());
        return userSensors != null ? userSensors : Collections.emptyList();
    }

    @Override
    public Iterable<Sensor> getAllSensorsByGatewayId(String gatewayID) {
        Gateway gateway = gatewayRepository.findOne(gatewayID);
        if (gateway != null) {
            return sensorRepository.findByAttachedGateway(gatewayID);
        } else {
            throw new EntityNotFoundException(String.format("Gateway with id '%s' not found", gatewayID));
        }
    }

    @Override
    public Sensor createSensor(@Validated SensorPostDto sensor, UserDetails authenticatedUser) {
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
    public Sensor updateSensor(String sensorID, @Validated SensorPutDto sensor, UserDetails authenticatedUser) {
        Sensor oldSensor = sensorRepository.findOne(sensorID);
        if (oldSensor != null) {
            User user = userRepository.findOne(authenticatedUser.getUsername());
            if (user != null) {
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
                    throw new AccessDeniedException("No rights to access!");
                }
            } else {
                throw new UsernameNotFoundException(String.format("User with username '%s' not found", authenticatedUser.getUsername()));
            }
        } else {
            throw new EntityNotFoundException(String.format("Sensor with id '%s' not found",sensorID));
        }
    }

    @Override
    public void deleteSensor(String sensorID) {
        sensorRepository.delete(sensorID);
        LOGGER.debug("Sensor with id: " + sensorID + " succussfully deleted");
    }
}
