package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Sensor;
import org.springframework.security.core.userdetails.UserDetails;

public interface SensorService {

    Iterable<Sensor> getAll();

    Iterable<Sensor> getAllForIds(Iterable<String> ids);

    Iterable<Sensor> getAll(UserDetails authenticatedUser) throws EntityNotFoundException;

    Sensor getOne(String sensorId) throws EntityNotFoundException;

    Iterable<Sensor> getAllReleasedForUser(String username) throws EntityNotFoundException;

    Iterable<Sensor> getAllByOwner(String username) throws EntityNotFoundException;

    Iterable<Sensor> getAllByOwner(String username, UserDetails authenticatedUser) throws EntityNotFoundException, NotAuthorizedException;

    Iterable<Sensor> getAllByGatewayId(String gatewayId) throws EntityNotFoundException;

    Iterable<Sensor> getAllByGatewayId(String gatewayId, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    Iterable<Sensor> getAllByClusterId(String clusterId) throws EntityNotFoundException;

    Iterable<Sensor> getAllByClusterId(String clusterId, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    Sensor save(Sensor sensor) throws EntityNotFoundException;

    Sensor save(Sensor sensor, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    void delete(String sensorId) throws EntityNotFoundException;

    void delete(String sensorId, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    boolean isActive(String id) throws EntityNotFoundException;

}
