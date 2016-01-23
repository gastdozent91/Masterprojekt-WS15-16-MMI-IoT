package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.rest.Cluster;
import de.bht.mmi.iot.model.rest.User;
import de.bht.mmi.iot.repository.ClusterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class ClusterServiceImpl implements ClusterService{

    @Autowired
    private ClusterRepository clusterRepository;

    @Autowired
    private UserService userService;

    private Logger LOGGER = LoggerFactory.getLogger(ClusterServiceImpl.class);

    @Override
    public Iterable<Cluster> getAll() {
        return clusterRepository.findAll();
    }

    @Override
    public Cluster getCluster(String clusterId) throws EntityNotFoundException {
        Cluster cluster = clusterRepository.findOne(clusterId);
        if (cluster != null) {
            return cluster;
        } else {
            throw new EntityNotFoundException(String.format("Cluster with id '%s' not found!", clusterId));
        }
    }

    @Override
    public Cluster createCluster(Cluster cluster) {
        return clusterRepository.save(cluster);
    }

    @Override
    public Cluster updateCluster(String clusterId, Cluster cluster, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        final Cluster oldCluster = getCluster(clusterId);
        final User user = userService.loadUserByUsername(authenticatedUser.getUsername());
        if (oldCluster != null && !oldCluster.equals(cluster)) {
            if (user.getRoles().contains(RoleConstants.ROLE_ADMIN)) {
                oldCluster.setName(cluster.getName());
                oldCluster.setSensorList(cluster.getSensorList());
                return clusterRepository.save(oldCluster);
            } else {
                throw new NotAuthorizedException(
                        String.format("You are not authorized to access cluster with id '%s'", clusterId));
            }
        } else {
            throw new EntityNotFoundException(String.format("Cluster with id '%s' not found", clusterId));
        }
    }

    @Override
    public void deleteCluster(String clusterId) throws EntityNotFoundException {
        getCluster(clusterId);
        clusterRepository.delete(clusterId);
        LOGGER.debug(String.format("Cluster with id '%s' deleted", clusterId));
    }

}
