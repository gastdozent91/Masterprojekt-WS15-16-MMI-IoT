package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Sensor;
import org.springframework.security.core.userdetails.UserDetails;

public interface SensorService {

    Iterable<Sensor> getAll();

    Iterable<Sensor> getAllForIds(Iterable<String> ids);

    Iterable<Sensor> getAll(UserDetails authenticatedUser) throws EntityNotFoundException;

    Sensor getSensor(String sensorId) throws EntityNotFoundException;

    Iterable<Sensor> getAllReleasedForUser(String username) throws EntityNotFoundException;

    Iterable<Sensor> getAllByOwner(String username) throws EntityNotFoundException;

    Iterable<Sensor> getAllByGateway(String gatewayId) throws EntityNotFoundException;

    Iterable<Sensor> getAllByGateway(String gatewayId, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    Iterable<Sensor> getAllByCluster(String clusterId) throws EntityNotFoundException;

    Iterable<Sensor> getAllByCluster(String clusterId, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    Sensor saveSensor(Sensor sensor) throws EntityNotFoundException;

    Sensor saveSensor(Sensor sensor, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    void deleteSensor(String sensorId) throws EntityNotFoundException;

    void deleteSensor(String sensorId, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    boolean isActive(String id) throws EntityNotFoundException;

}
