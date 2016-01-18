package de.bht.mmi.iot.service;

import de.bht.mmi.iot.model.rest.Cluster;
import org.springframework.security.core.userdetails.UserDetails;

public interface ClusterService {

    Iterable<Cluster> getAll();

    Cluster getCluster(String id);

    Cluster createCluster(Cluster cluster);

    Cluster updateCluster(String id, Cluster cluster, UserDetails userDetails);

    void deleteCluster(String id);

}
