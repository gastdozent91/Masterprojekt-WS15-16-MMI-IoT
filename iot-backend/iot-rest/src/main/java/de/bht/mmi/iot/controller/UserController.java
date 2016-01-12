package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.creator.TableCreator;
import de.bht.mmi.iot.dto.UserPostDto;
import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.SensorRepository;
import de.bht.mmi.iot.repository.UserRepository;
import de.bht.mmi.iot.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;

// TODO: Replace all sysouts with logger
@RestController
@RequestMapping("/user")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private TableCreator userTableCreator;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<User> getAllUser() {
        return userService.getAllUsers();
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody @Validated UserPostDto dto) {
        return userService.saveUser(dto);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.PUT, consumes = "application/json")
    public User updateUser(@PathVariable("username") String username, @RequestBody @Validated UserPutDto dto,
                           @AuthenticationPrincipal UserDetails userDetails) {
        return userService.updateUser(username, dto, userDetails);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("username") String username) {
        userService.deleteUser(username);
    }

    @RequestMapping(value = "/{username}/sensor",method = RequestMethod.PUT, consumes = "application/json")
    public User updateUserSensorList(@PathVariable("username") String username, @RequestBody ArrayList<String> sensorList) {
        // TODO: May be we need a new roles for people wich can add sensors
        // TODO: admin can edit data from every user
        try {
            User user = userRepository.findOne(username);

            if (user != null) {
                user.setSensorList(sensorList);
            }
            return userRepository.save(user);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            System.err.println("Error attaching Sensor to User: "+username);
            return null;
        }
    }

    @RequestMapping(value = "/{username}/sensor", method = RequestMethod.GET)
    public Iterable<Sensor> getAllAttachedSensors(@PathVariable("username") String username) {
        // TODO: see todo updateUserSensorList
        try {
            User user = userRepository.findOne(username);
            if (user != null) {
                ArrayList<Sensor> sensorList = new ArrayList<Sensor>();
                if (user.getSensorList() != null) {
                    for (String sensorID : user.getSensorList()) {
                        sensorList.add(sensorRepository.findOne(sensorID));
                    }
                }
                return sensorList;
            } else {
                throw new EntityNotFoundException();
            }
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            System.err.println("Error requesting sensorList for User: "+username);
        }
        return null;
    }

    // Table Create/Delete
    @RequestMapping(value = "/createTable")
    public String createTable() {
        return userTableCreator.createUserTable();
    }

    @RequestMapping(value = "/deleteTable")
    public String deleteTable() {
        return userTableCreator.deleteTable(TableCreator.TABLENAME_USER);
    }

}
