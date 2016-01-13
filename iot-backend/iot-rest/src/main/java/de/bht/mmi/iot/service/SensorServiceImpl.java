package de.bht.mmi.iot.service;

import de.bht.mmi.iot.model.RoleConstants;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class SensorServiceImpl implements SensorService {

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private UserService userService;

    public Iterable<Sensor> getAll(Iterable<String> ids) {
        return sensorRepository.findAll(ids);
    }

    @Override
    public Iterable<Sensor> getAllSensorsByUsername(String username, User user) {
        if (!(userService.isRolePresent(user, RoleConstants.ROLE_ADMIN) ||
                user.getUsername().equals(username))) {
            // TODO: More meaningfuel exception message
            throw new AccessDeniedException("Operation not permitted");
        }
        return sensorRepository.findAll(user.getSensorList());
    }

}
