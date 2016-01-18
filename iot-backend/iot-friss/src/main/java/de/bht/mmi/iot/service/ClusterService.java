package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.model.rest.Cluster;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface ClusterService {

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Iterable<Cluster> getAll();

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    Cluster getCluster(String id);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Cluster createCluster(@RequestBody Cluster cluster);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Cluster updateCluster(@PathVariable("id") String id, @RequestBody Cluster cluster, UserDetails userDetails);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public void deleteCluster(@PathVariable("id") String id);
}
