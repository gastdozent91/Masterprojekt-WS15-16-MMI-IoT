package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.service.GatewayService;
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
@RequestMapping("/gateway")
public class GatewayController {

    @Autowired
    private GatewayService gatewayService;

    @Autowired
    private SensorService sensorService;

    @Autowired
    private UserService userService;

    // GET
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Gateway> getAllGateways(@RequestParam(value = "owner", required = false) String owner,
                                            @AuthenticationPrincipal UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        if (owner == null) {
            return gatewayService.getAll(authenticatedUser);
        } else {
            return gatewayService.getAllByOwner(owner, authenticatedUser);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public Gateway getGateway(@PathVariable("id") String id) throws EntityNotFoundException {
        return gatewayService.getOne(id);
    }

    @RequestMapping(value = "/{id}/sensor", method = RequestMethod.GET)
    public Iterable<Sensor> getAllAttachedSensors(@PathVariable("id") String id,
                                                  @AuthenticationPrincipal UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        return sensorService.getAllByGatewayId(id, authenticatedUser);
    }

    // POST
    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Gateway createGateway(@RequestBody @Validated Gateway gateway,
                                 @AuthenticationPrincipal UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        return gatewayService.save(gateway, authenticatedUser);
    }

    // PUT
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public Gateway updateGateway(@PathVariable("id") String id,
                                 @RequestBody @Validated Gateway gateway,
                                 @AuthenticationPrincipal UserDetails authenticatedUser)
            throws NotAuthorizedException, EntityNotFoundException {
        gateway.setId(id);
        return gatewayService.save(gateway, authenticatedUser);
    }

    // DELETE
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteGateway(@PathVariable("id") String id, @AuthenticationPrincipal UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        gatewayService.delete(id, authenticatedUser);
    }

}
