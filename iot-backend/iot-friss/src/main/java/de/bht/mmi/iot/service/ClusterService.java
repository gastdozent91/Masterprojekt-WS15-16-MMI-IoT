package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Cluster;
import org.springframework.security.core.userdetails.UserDetails;

public interface ClusterService {

    Iterable<Cluster> getAll();

    Iterable<Cluster> getAllByOwner(String username) throws EntityNotFoundException;

    Iterable<Cluster> getAllByOwner(String username, UserDetails authenticatedUser) throws EntityNotFoundException, NotAuthorizedException;

    Iterable<Cluster> getAll(UserDetails authenticatedUser) throws EntityNotFoundException;

    Iterable<Cluster> getAllReleasedForUser(String username) throws EntityNotFoundException;

    Cluster getCluster(String clusterId) throws EntityNotFoundException;

    Cluster saveCluster(Cluster cluster) throws EntityNotFoundException;

    Cluster saveCluster(Cluster cluster, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    void deleteCluster(String clusterId) throws EntityNotFoundException;

    void deleteCluster(String clusterId, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

}
