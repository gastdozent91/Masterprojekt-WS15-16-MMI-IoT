package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.service.TableCreatorService;
import de.bht.mmi.iot.dto.UserPostDto;
import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.service.SensorService;
import de.bht.mmi.iot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private SensorService sensorService;

    @Autowired
    private UserService userService;

    @Autowired
    private TableCreatorService userTableCreator;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<User> getAllUser() {
        return userService.getAllUsers();
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody @Validated UserPostDto dto) {
        return userService.createUser(dto);
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
    public User updateUserSensorList(@PathVariable("username") String username, @RequestBody List<String> sensorList,
                                     @AuthenticationPrincipal User user) {
        // TODO: May be we need a new roles for people wich can add sensors
        return userService.updateUserSensors(username, sensorList, user);
    }

    @RequestMapping(value = "/{username}/sensor", method = RequestMethod.GET)
    public Iterable<Sensor> getAllAttachedSensors(@PathVariable("username") String username,
                                                  @AuthenticationPrincipal User user) {
        return sensorService.getAllSensorsByUsername(username, user);
    }
    // Table Create/Delete
    @RequestMapping(value = "/createTable")
    public String createTable() {
        return userTableCreator.createUserTable();
    }

    @RequestMapping(value = "/deleteTable")
    public String deleteTable() {
        return userTableCreator.deleteTable(TableCreatorService.TABLENAME_USER);
    }

}
