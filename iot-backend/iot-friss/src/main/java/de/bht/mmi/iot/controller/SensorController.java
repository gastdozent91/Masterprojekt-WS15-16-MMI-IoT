package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.dto.SensorPutDto;
import de.bht.mmi.iot.service.SensorService;
import de.bht.mmi.iot.service.TableCreatorService;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/sensor")
public class SensorController {

    @Autowired
    private SensorService sensorService;

    @Autowired
    private TableCreatorService tableCreator;

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Sensor createSensor(@RequestBody SensorPostDto sensor,
                               @AuthenticationPrincipal UserDetails userDetails) {
        return sensorService.createSensor(sensor, userDetails);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Sensor getSensor(@PathVariable("id") String id) {
        return sensorService.getSensor(id);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Sensor> getAllSensor() {
        return sensorService.getAll();
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.PUT, consumes = "application/json")
    public Sensor updateSensor(@PathVariable("id") String id,
                               @RequestBody @Validated SensorPutDto sensor,
                               @AuthenticationPrincipal UserDetails userDetails) {
        return sensorService.updateSensor(id, sensor, userDetails);
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public void deleteSensor(@PathVariable("id") String id) {
        sensorService.deleteSensor(id);
    }

}
