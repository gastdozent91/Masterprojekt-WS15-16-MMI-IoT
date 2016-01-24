package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.dto.SensorPutDto;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface SensorService {

    Iterable<Sensor> getAll();

    Sensor getSensor(String sensorId) throws EntityNotFoundException;

    Iterable<Sensor> getAllSensorsByUsername(String username, User user) throws NotAuthorizedException, EntityNotFoundException;

    Iterable<Sensor> getAllSensorsByGatewayId(String gatewayId) throws EntityNotFoundException;

    Sensor createSensor(SensorPostDto sensor, UserDetails authenticatedUser) throws EntityNotFoundException;

    Sensor updateSensor(String sensorId, SensorPutDto sensor, UserDetails authenticatedUser) throws EntityNotFoundException, NotAuthorizedException;

    void deleteSensor(String sensorId) throws EntityNotFoundException;

}
