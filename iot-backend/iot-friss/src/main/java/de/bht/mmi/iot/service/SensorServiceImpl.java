package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.CacheConstants;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Cluster;
import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.SensorRepository;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static de.bht.mmi.iot.constants.RoleConstants.*;

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

    @Autowired
    private CacheService cacheService;

    @Override
    public Iterable<Sensor> getAll() {
        return sensorRepository.findAll();
    }

    @Override
    public Iterable<Sensor> getAllForIds(Iterable<String> ids) {
        return sensorRepository.findAll(ids);
    }

    @Override
    public Iterable<Sensor> getAll(UserDetails authenticatedUser) throws EntityNotFoundException {
        final String username = authenticatedUser.getUsername();
        if (userService.isAnyRolePresent(authenticatedUser, ROLE_ADMIN, ROLE_GET_ALL_SENSOR)) {
            return getAll();
        } else {
            final Set<Sensor> result = new HashSet<>();
            CollectionUtils.addAll(result, getAllByOwner(username));
            CollectionUtils.addAll(result, getAllReleasedForUser(username));
            return result;
        }
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
    public Iterable<Sensor> getAllReleasedForUser(String username) throws EntityNotFoundException {
        final User user = userService.loadUserByUsername(username);
        final Iterable<Sensor> userSensors = sensorRepository.findAll(user.getReleasedForSensors());
        return userSensors != null ? userSensors : Collections.emptyList();
    }

    @Override
    public Iterable<Sensor> getAllByOwner(String username) throws EntityNotFoundException {
        userService.loadUserByUsername(username);
        return sensorRepository.findByOwner(username);
    }

    @Override
    public Iterable<Sensor> getAllByGateway(String gatewayId) throws EntityNotFoundException {
        gatewayService.getGateway(gatewayId);
        return sensorRepository.findByAttachedGateway(gatewayId);
    }

    @Override
    public Iterable<Sensor> getAllByGateway(String gatewayId, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        final Gateway gateway = gatewayService.getGateway(gatewayId);
        final User user = userService.loadUserByUsername(authenticatedUser.getUsername());
        final List<String> releasedForGatewayIds = user.getReleasedForGateways();

        final boolean isOwner = gateway.getOwner().equals(authenticatedUser.getUsername());

        if (userService.isAnyRolePresent(authenticatedUser, ROLE_ADMIN, ROLE_GET_ALL_GATEWAY)
                || isOwner
                || releasedForGatewayIds.contains(gatewayId)) {
            final Iterable<Sensor> allSensorsFromGateway = getAllByGateway(gatewayId);
            if (userService.isRolePresent(authenticatedUser, ROLE_GET_ALL_SENSOR) || isOwner) {
                return allSensorsFromGateway;
            }
            final Iterable<Sensor> allSensorsReleasedForUser = getAll(authenticatedUser);
            return CollectionUtils.intersection(allSensorsFromGateway, allSensorsReleasedForUser);
        } else {
            throw new NotAuthorizedException(
                    String.format("You are not authorized to access gateway with id: '%s", gatewayId));
        }
    }

    @Override
    public Iterable<Sensor> getAllByCluster(String clusterId) throws EntityNotFoundException {
        clusterService.getCluster(clusterId);
        return sensorRepository.findByAttachedCluster(clusterId);
    }

    @Override
    public Iterable<Sensor> getAllByCluster(String clusterId, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        final Cluster cluster = clusterService.getCluster(clusterId);
        final User user = userService.loadUserByUsername(authenticatedUser.getUsername());
        final List<String> releasedForClusters = user.getReleasedForClusters();

        final boolean isOwner = cluster.getOwner().equals(authenticatedUser.getUsername());

        if (userService.isAnyRolePresent(authenticatedUser, ROLE_ADMIN, ROLE_GET_ALL_CLUSTER)
                || isOwner
                || releasedForClusters.contains(clusterId)) {
            final Iterable<Sensor> allSensorsFromCluster = getAllByCluster(clusterId);
            if (userService.isRolePresent(authenticatedUser, ROLE_GET_ALL_SENSOR) || isOwner) {
                return allSensorsFromCluster;
            }
            final Iterable<Sensor> allSensorsReleasedForUser = getAll(authenticatedUser);
            return CollectionUtils.intersection(allSensorsFromCluster, allSensorsReleasedForUser);
        } else {
            throw new NotAuthorizedException(
                    String.format("You are not authorized to access cluster with id: '%s", clusterId));
        }
    }
    @Override
    public Sensor saveSensor(Sensor sensor) throws EntityNotFoundException {
        userService.loadUserByUsername(sensor.getOwner());
        clusterService.getCluster(sensor.getAttachedCluster());
        gatewayService.getGateway(sensor.getAttachedGateway());
        return sensorRepository.save(sensor);
    }

    @Override
    public Sensor saveSensor(Sensor sensor, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        Sensor oldSensor = null;
        if (sensor.getId() != null) {
            oldSensor = sensorRepository.findOne(sensor.getId());
        }

        if (oldSensor == null) {
            if (userService.isAnyRolePresent(authenticatedUser, ROLE_ADMIN, ROLE_CREATE_SENSOR)) {
                return saveSensor(sensor);
            }
        } else {
            if (userService.isAnyRolePresent(authenticatedUser, ROLE_ADMIN, ROLE_UPDATE_SENSOR)
                    || oldSensor.getOwner().equals(authenticatedUser.getUsername())) {
                final Sensor savedSensor = saveSensor(sensor);
                cacheService.getCache(CacheConstants.CACHE_SENSOR_ACTIVE).evict(savedSensor.getId());
                return savedSensor;
            }
        }
        throw new NotAuthorizedException("You are not authorized to save/update sensors");
    }

    @Override
    public void deleteSensor(String sensorId) throws EntityNotFoundException {
        getSensor(sensorId);
        sensorRepository.delete(sensorId);
    }

    @Override
    public void deleteSensor(String sensorId, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        final Sensor sensor = getSensor(sensorId);
        if (userService.isAnyRolePresent(authenticatedUser, ROLE_ADMIN, ROLE_DELETE_SENSOR)
                || sensor.getOwner().equals(authenticatedUser.getUsername())) {
            sensorRepository.delete(sensor);
            return;
        }
        throw new NotAuthorizedException(
                String.format("You are not authorized to delete sensor with id '%s'", sensor.getId()));
    }

    @Override
    @Cacheable(CacheConstants.CACHE_SENSOR_ACTIVE)
    public boolean isActive(String id) throws EntityNotFoundException {
        return getSensor(id).isActive();
    }

}
