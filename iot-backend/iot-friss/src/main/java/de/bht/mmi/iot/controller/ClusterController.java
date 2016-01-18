package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.model.rest.Cluster;
import de.bht.mmi.iot.service.ClusterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cluster")
public class ClusterController {

    @Autowired
    private ClusterService clusterService;

    // GET
    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Iterable<Cluster> getAllCluster() {
        return clusterService.getAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public Cluster getCluster(@PathVariable("id") String id) {
        return clusterService.getCluster(id);
    }


    // POST
    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Cluster createCluster(@RequestBody Cluster cluster) {
        return clusterService.createCluster(cluster);
    }


    // PUT
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = "application/json")
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Cluster updateCluster(@PathVariable("id") String id,
                                 @RequestBody Cluster cluster,
                                 @AuthenticationPrincipal UserDetails userDetails) {
        return clusterService.updateCluster(id, cluster, userDetails);
    }

    // DELETE
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public void deleteCluster(@PathVariable("id") String id) { clusterService.deleteCluster(id);
    }

}
