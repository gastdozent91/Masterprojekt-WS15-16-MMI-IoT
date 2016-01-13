package de.bht.mmi.iot.service;

import de.bht.mmi.iot.model.RoleConstants;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import org.springframework.security.access.prepost.PreAuthorize;

public interface SensorService {

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    Iterable<Sensor> getAll(Iterable<String> ids);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    Iterable<Sensor> getAllSensorsByUsername(String username, User user);

}
