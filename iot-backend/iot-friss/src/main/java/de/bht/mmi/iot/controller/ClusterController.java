package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Cluster;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.service.ClusterService;
import de.bht.mmi.iot.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cluster")
public class ClusterController {

    @Autowired
    private ClusterService clusterService;

    @Autowired
    private SensorService sensorService;

    // GET
    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Iterable<Cluster> getAllCluster() {
        return clusterService.getAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public Cluster getCluster(@PathVariable("id") String id) throws EntityNotFoundException {
        return clusterService.getCluster(id);
    }

    @RequestMapping(value = "/{id}/sensor", method = RequestMethod.GET)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public Iterable<Sensor> getAllAttachedSensors(@PathVariable("id") String id) throws EntityNotFoundException {
        return sensorService.getAllSensorsByClusterId(id);
    }

    // POST
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Cluster createCluster(@RequestBody @Validated Cluster cluster) throws EntityNotFoundException {
        return clusterService.createCluster(cluster);
    }


    // PUT
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Cluster updateCluster(@PathVariable("id") String id,
                                 @RequestBody @Validated Cluster cluster,
                                 @AuthenticationPrincipal UserDetails authenticatedUser)
            throws NotAuthorizedException, EntityNotFoundException {
        return clusterService.updateCluster(id, cluster, authenticatedUser);
    }

    // DELETE
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public void deleteCluster(@PathVariable("id") String id) throws EntityNotFoundException {
        clusterService.deleteCluster(id);
    }

}
