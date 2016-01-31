package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Cluster;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.ClusterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class ClusterServiceImpl implements ClusterService{

    @Autowired
    private ClusterRepository clusterRepository;

    @Autowired
    private UserService userService;

    @Override
    public Iterable<Cluster> getAll() {
        return clusterRepository.findAll();
    }

    @Override
    public Cluster getCluster(String clusterId) throws EntityNotFoundException {
        final Cluster cluster = clusterRepository.findOne(clusterId);
        if (cluster != null) {
            return cluster;
        } else {
            throw new EntityNotFoundException(String.format("Cluster with id '%s' not found!", clusterId));
        }
    }

    @Override
    public Cluster createCluster(Cluster cluster) throws EntityNotFoundException {
        userService.loadUserByUsername(cluster.getOwner());
        return clusterRepository.save(cluster);
    }

    @Override
    public Cluster updateCluster(String clusterId, Cluster cluster, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        final Cluster oldCluster = clusterRepository.findOne(clusterId);
        final User user = userService.loadUserByUsername(authenticatedUser.getUsername());

        if ((oldCluster != null && oldCluster.getOwner() == authenticatedUser.getUsername()) ||
                userService.isRolePresent(authenticatedUser, RoleConstants.ROLE_ADMIN)) {
            cluster.setId(clusterId);
            return clusterRepository.save(cluster);
        } else {
            throw new NotAuthorizedException(
                    String.format("You are not authorized to update cluster with id '%s'", clusterId));
        }
    }

    @Override
    public void deleteCluster(String clusterId) throws EntityNotFoundException {
        getCluster(clusterId);
        clusterRepository.delete(clusterId);
    }

}
