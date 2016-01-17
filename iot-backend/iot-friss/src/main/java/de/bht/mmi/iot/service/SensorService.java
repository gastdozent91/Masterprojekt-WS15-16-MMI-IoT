package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.dto.SensorPutDto;
import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;

public interface SensorService {

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    Iterable<Sensor> getAll();

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    Iterable<Sensor> getAllSensorsByUsername(String username, User user);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    Iterable<Sensor> getAllSensorsByGatewayId(String id);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    Sensor createSensor(SensorPostDto sensor, UserDetails userDetails);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    Sensor updateSensor(String sensorID, SensorPutDto sensor, UserDetails userDetails);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    void deleteSensor(String sensorID);
}
