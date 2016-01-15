package de.bht.mmi.iot.rest;

import de.bht.mmi.iot.model.Sensor2;
import de.bht.mmi.iot.repository.SensorRepository2;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sensor2")
public class Sensor2Controller {

    @Autowired
    private SensorRepository2 sensorRepository;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Sensor2> getAllSensors() {
        return sensorRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Sensor2 createSensor() {
        final Sensor2 sensor = new Sensor2("yolo", new DateTime());
        return sensorRepository.save(sensor);
    }

}
