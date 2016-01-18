package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.dto.SensorPutDto;
import de.bht.mmi.iot.model.rest.Sensor;
import de.bht.mmi.iot.model.rest.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface SensorService {

    Iterable<Sensor> getAll();

    Sensor getSensor(String id);

    Iterable<Sensor> getAllSensorsByUsername(String username, User user);

    Iterable<Sensor> getAllSensorsByGatewayId(String id);

    Sensor createSensor(SensorPostDto sensor, UserDetails userDetails);

    Sensor updateSensor(String sensorID, SensorPutDto sensor, UserDetails userDetails);

    void deleteSensor(String sensorID);

}
