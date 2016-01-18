package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.model.rest.Cluster;
import de.bht.mmi.iot.service.ClusterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cluster")
public class ClusterController {

    @Autowired
    private ClusterService clusterService;

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    public Cluster createCluster(@RequestBody Cluster cluster) {
        return clusterService.createCluster(cluster);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Cluster> getAllCluster() {
        return clusterService.getAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Cluster getCluster(@PathVariable("id") String id) {
        return clusterService.getCluster(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public Cluster updateCluster(@PathVariable("id") String id,
                                 @RequestBody Cluster cluster,
                                 @AuthenticationPrincipal UserDetails userDetails) {
        return clusterService.updateCluster(id, cluster, userDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteCluster(@PathVariable("id") String id) { clusterService.deleteCluster(id);
    }

}
