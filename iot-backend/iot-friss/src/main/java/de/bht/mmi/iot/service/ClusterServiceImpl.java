package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.model.rest.Cluster;
import de.bht.mmi.iot.model.rest.User;
import de.bht.mmi.iot.repository.ClusterRepository;
import de.bht.mmi.iot.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.EntityNotFoundException;

@Service
public class ClusterServiceImpl implements ClusterService{

    @Autowired
    private ClusterRepository clusterRepository;

    @Autowired
    private UserRepository userRepository;

    private Logger LOGGER = LoggerFactory.getLogger(ClusterServiceImpl.class);

    @Override
    public Iterable<Cluster> getAll() {
        return clusterRepository.findAll();
    }

    @Override
    public Cluster getCluster(String id) {
        Cluster cluster = clusterRepository.findOne(id);
        if (cluster != null) {
            return cluster;
        } else {
            throw new EntityNotFoundException(String.format("Cluster with id '%s' not found!",id));
        }
    }

    @Override
    public Cluster createCluster(@RequestBody Cluster cluster) {
        return clusterRepository.save(cluster);
    }

    @Override
    public Cluster updateCluster(@PathVariable("id") String id, @RequestBody Cluster cluster, UserDetails userDetails) {
        Cluster oldCluster = clusterRepository.findOne(id);
        User user = userRepository.findOne(userDetails.getUsername());
        if (oldCluster != null && !oldCluster.equals(cluster)) {
            if (user.getRoles().contains(RoleConstants.ROLE_ADMIN)) {
                oldCluster.setName(cluster.getName());
                oldCluster.setSensorList(cluster.getSensorList());
                return clusterRepository.save(oldCluster);
            } else {
                throw new AccessDeniedException(String.format("No rights to access!"));
            }
        } else {
            throw new EntityNotFoundException(String.format("Cluster with id '%s' not found",id));
        }
    }

    @Override
    public void deleteCluster(@PathVariable("id") String id) {
        clusterRepository.delete(id);
        LOGGER.debug(String.format("Cluster with id '%s' successfull deleted",id));

    }
}
