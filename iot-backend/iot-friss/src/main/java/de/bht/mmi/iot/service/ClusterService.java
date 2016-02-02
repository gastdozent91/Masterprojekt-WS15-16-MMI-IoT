package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Cluster;
import org.springframework.security.core.userdetails.UserDetails;

public interface ClusterService {

    Iterable<Cluster> getAll();

    Iterable<Cluster> getAllByOwner(String username);

    Cluster getCluster(String clusterId) throws EntityNotFoundException;

    Cluster createCluster(Cluster cluster) throws EntityNotFoundException;

    Cluster updateCluster(String clusterId, Cluster cluster, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    void deleteCluster(String clusterId) throws EntityNotFoundException;

}
