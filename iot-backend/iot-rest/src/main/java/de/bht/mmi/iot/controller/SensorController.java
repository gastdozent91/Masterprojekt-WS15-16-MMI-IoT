package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.creator.TableCreator;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/sensor")
public class SensorController {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private TableCreator tableCreator;

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    public Sensor createSensor(@RequestBody Sensor sensor) {
        return sensorRepository.save(sensor);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Sensor> getAllSensor() {
        return sensorRepository.findAll();
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.PUT, consumes = "application/json")
    public Sensor updateSensor(@PathVariable("id") String id, @RequestBody Sensor sensor) {
        try {
            Sensor oldSensor = sensorRepository.findOne(id);
            if (oldSensor != null && !oldSensor.equals(sensor)) {
                oldSensor.setActive(sensor.isActive());
                oldSensor.setLocation(sensor.getLocation());
                oldSensor.setOwnerID(sensor.getOwnerID());
                oldSensor.setSensorType(sensor.getSensorType());
                return sensorRepository.save(oldSensor);
            } else {
                throw new Exception("Sensor not found with id: "+id);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error updating Sensor");
            return null;
        }
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public String deleteSensor(@PathVariable("id") String id) {
        try {
            Sensor sensor = sensorRepository.findOne(id);
            sensorRepository.delete(id);
            return "Sensor with id: " + id + " succussfully deleted";
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return "Error deleting Sensor";
        }
    }

    // Table Create/Delete


    @RequestMapping(value = "/createTable")
    public String createTable() throws Exception {
        return tableCreator.createSensorTable();
    }

    @RequestMapping(value = "/deleteTable")
    public String deleteTable() throws Exception {
        return tableCreator.deleteTable(TableCreator.TABLENAME_SENSOR);
    }

}
