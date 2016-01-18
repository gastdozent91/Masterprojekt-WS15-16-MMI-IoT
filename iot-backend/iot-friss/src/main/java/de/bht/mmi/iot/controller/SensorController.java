package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.dto.SensorPutDto;
import de.bht.mmi.iot.model.rest.Sensor;
import de.bht.mmi.iot.service.SensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sensor")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    // GET
    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Iterable<Sensor> getAllSensor() {
        return sensorService.getAll();
    }

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Sensor getSensor(@PathVariable("id") String id) {
        return sensorService.getSensor(id);
    }

    // POST
    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Sensor createSensor(@RequestBody SensorPostDto sensor,
                               @AuthenticationPrincipal UserDetails userDetails) {
        return sensorService.createSensor(sensor, userDetails);
    }

    // PUT
    @RequestMapping(value = "/{id}",method = RequestMethod.PUT, consumes = "application/json")
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Sensor updateSensor(@PathVariable("id") String id,
                               @RequestBody @Validated SensorPutDto sensor,
                               @AuthenticationPrincipal UserDetails userDetails) {
        return sensorService.updateSensor(id, sensor, userDetails);
    }

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public void deleteSensor(@PathVariable("id") String id) {
        sensorService.deleteSensor(id);
    }

}
