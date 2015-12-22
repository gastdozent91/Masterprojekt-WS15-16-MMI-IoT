package de.bht.mmi.iot.rest;

import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.repository.SensorRepository;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sensor")
public class SensorController {

    @Autowired
    private SensorRepository sensorRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Sensor> getAllSensors() {
        return sensorRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Sensor createSensor() {
        final Sensor sensor = new Sensor("yolo", new DateTime());
        return sensorRepository.save(sensor);
    }

}
