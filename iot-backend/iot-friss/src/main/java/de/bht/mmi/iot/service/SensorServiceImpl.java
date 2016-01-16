package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.dto.SensorPutDto;
import de.bht.mmi.iot.model.RoleConstants;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.SensorRepository;
import de.bht.mmi.iot.repository.UserRepository;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;

@Service
public class SensorServiceImpl implements SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    public Iterable<Sensor> getAll() {
        return sensorRepository.findAll();
    }

    Logger LOGGER = LoggerFactory.getLogger(SensorServiceImpl.class);

    @Override
    public Iterable<Sensor> getAllSensorsByUsername(String username, User user) {
        if (!(userService.isRolePresent(user, RoleConstants.ROLE_ADMIN) ||
                user.getUsername().equals(username))) {
            throw new AccessDeniedException("Operation not permitted! Access denied!");
        }
        return sensorRepository.findAll(user.getSensorList());
    }

    @Override
    public Sensor createSensor(@Validated SensorPostDto sensor, UserDetails userDetails) {
        final Sensor newSensor = new Sensor(sensor.isActive(),
                                            new DateTime(),
                                            sensor.getLocation(),
                                            sensor.getClusterID(),
                                            userDetails.getUsername(),
                                            sensor.getSensorType());
        return sensorRepository.save(newSensor);
    }

    @Override
    public Sensor updateSensor(String sensorID, @Validated SensorPutDto sensor, UserDetails userDetails) {
        Sensor oldSensor = sensorRepository.findOne(sensorID);
        if (oldSensor != null) {
            User user = userRepository.findOne(userDetails.getUsername());
            if (user != null) {
                if (user.getRoles().contains(RoleConstants.ROLE_ADMIN)){
                    oldSensor.setActive(sensor.isActive());
                    oldSensor.setLocation(sensor.getLocation());
                    oldSensor.setSensorType(sensor.getSensorType());
                    oldSensor.setClusterID(sensor.getClusterID());
                    oldSensor.setOwnerName(sensor.getOwnerName());
                    if (sensor.getUserList() != null && sensor.getUserList().size() > 0) {
                        oldSensor.setUserList(sensor.getUserList());
                    }
                    return sensorRepository.save(oldSensor);
                } else if (oldSensor.getOwnerName().equals(userDetails.getUsername())) {
                    oldSensor.setActive(sensor.isActive());
                    oldSensor.setLocation(sensor.getLocation());
                    oldSensor.setSensorType(sensor.getSensorType());
                    oldSensor.setClusterID(sensor.getClusterID());
                    if (sensor.getUserList() != null && sensor.getUserList().size() > 0) {
                        oldSensor.setUserList(sensor.getUserList());
                    }
                    return sensorRepository.save(oldSensor);
                } else {
                        throw new AccessDeniedException("No rights to access!");
                }
            } else {
                throw new UsernameNotFoundException(String.format("User with username '%s' not found", userDetails.getUsername()));
            }
        } else {
            throw new EntityNotFoundException(String.format("Sensor with id '%s' not found",sensorID));
        }
    }

    @Override
    public void deleteSensor(String sensorID) {
        try {
            sensorRepository.delete(sensorID);
            LOGGER.debug("Sensor with id: " + sensorID + " succussfully deleted");
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            LOGGER.debug("Error deleting Sensor");
        }
    }
}
