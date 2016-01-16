package de.bht.mmi.iot.service;

import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.model.RoleConstants;
import de.bht.mmi.iot.model.Sensor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;

public interface GatewayService {

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Iterable<Gateway> getAll();

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Gateway createGateway(@RequestBody Gateway gateway);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Gateway updateGateway(@PathVariable("id") String id, @RequestBody Gateway gateway);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public String deleteGateway(@PathVariable("id") String id);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Gateway updateGatewaySensorList(@PathVariable("id") String id, @RequestBody ArrayList<String> sensorList);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public Iterable<Sensor> getAllAttachedSensors(@PathVariable("id") String id);
}
