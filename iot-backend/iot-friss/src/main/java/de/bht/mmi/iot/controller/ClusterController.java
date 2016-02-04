package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Cluster;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.service.ClusterService;
import de.bht.mmi.iot.service.SensorService;
import de.bht.mmi.iot.service.UserService;
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

    @Autowired
    private UserService userService;

    // GET
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Cluster> getAllCluster(@AuthenticationPrincipal UserDetails authenticatedUser) throws EntityNotFoundException {
        return clusterService.getAll(authenticatedUser);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public Cluster getCluster(@PathVariable("id") String id) throws EntityNotFoundException {
        return clusterService.getCluster(id);
    }

    @RequestMapping(value = "/{id}/sensor", method = RequestMethod.GET)
    public Iterable<Sensor> getAllAttachedSensors(@PathVariable("id") String id,
                                                  @AuthenticationPrincipal UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        return sensorService.getAllByCluster(id,authenticatedUser);
    }

    // POST
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Cluster createCluster(@RequestBody @Validated Cluster cluster,
                                 @AuthenticationPrincipal UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        return clusterService.saveCluster(cluster, authenticatedUser);
    }

    // PUT
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Cluster updateCluster(@PathVariable("id") String id,
                                 @RequestBody @Validated Cluster cluster,
                                 @AuthenticationPrincipal UserDetails authenticatedUser)
            throws NotAuthorizedException, EntityNotFoundException {
        cluster.setId(id);
        return clusterService.saveCluster(cluster, authenticatedUser);
    }

    // DELETE
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteCluster(@PathVariable("id") String id, @AuthenticationPrincipal UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        clusterService.deleteCluster(id, authenticatedUser);
    }

}
