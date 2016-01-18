package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.model.rest.Gateway;
import de.bht.mmi.iot.model.rest.Sensor;
import de.bht.mmi.iot.service.GatewayService;
import de.bht.mmi.iot.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gateway")
public class GatewayController {

    @Autowired
    private GatewayService gatewayService;

    @Autowired
    private SensorService sensorService;

    // GET
    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Iterable<Gateway> getAllGateways() {
        return gatewayService.getAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public Gateway getGateway(@PathVariable("id") String id) {
        return gatewayService.getGateway(id);
    }

    @RequestMapping(value = "/{id}/sensor", method = RequestMethod.GET)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public Iterable<Sensor> getAllAttachedSensors(@PathVariable("id") String id) {
        return sensorService.getAllSensorsByGatewayId(id);
    }

    // POST
    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Gateway createGateway(@RequestBody Gateway gateway) {
        return gatewayService.createGateway(gateway);
    }

    // PUT
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = "application/json")
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Gateway updateGateway(@PathVariable("id") String id,
                                 @RequestBody Gateway gateway,
                                 @AuthenticationPrincipal UserDetails userDetails) {
        return gatewayService.updateGateway(id, gateway, userDetails);
    }

    // DELETE
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public void deleteGateway(@PathVariable("id") String id) { gatewayService.deleteGateway(id);
    }


}
