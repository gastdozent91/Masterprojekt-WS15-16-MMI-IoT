package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.exception.EntityExistsException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.rest.Sensor;
import de.bht.mmi.iot.model.rest.User;
import de.bht.mmi.iot.service.SensorService;
import de.bht.mmi.iot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Iterable<User> getAllUser() {
        return userService.loadAllUsers();
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public User getUser(@PathVariable("username") String username, @AuthenticationPrincipal UserDetails authenticatedUser)
            throws NotAuthorizedException, EntityNotFoundException {
        return userService.loadUserByUsername(username, authenticatedUser);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public User createUser(@RequestBody @Validated User user) throws EntityExistsException {
        return userService.saveUser(user);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public User updateUser(@PathVariable("username") String username, @RequestBody @Validated UserPutDto dto,
                           @AuthenticationPrincipal UserDetails authenticatedUser) throws NotAuthorizedException {
        return userService.updateUser(username, dto, authenticatedUser);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public void deleteUser(@PathVariable("username") String username) throws EntityNotFoundException {
        userService.deleteUser(username);
    }

    @RequestMapping(value = "/{username}/sensor", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public User updateUserSensorList(@PathVariable("username") String username, @RequestBody List<String> sensorList,
                                     @AuthenticationPrincipal UserDetails authenticatedUser) throws NotAuthorizedException,
            EntityNotFoundException {
        return userService.updateUserSensors(username, sensorList, authenticatedUser);
    }

    @RequestMapping(value = "/{username}/sensor", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    public Iterable<Sensor> getAllAttachedSensors(@PathVariable("username") String username,
                                                  @AuthenticationPrincipal User authenticatedUser)
            throws NotAuthorizedException, EntityNotFoundException {
        return sensorService.getAllSensorsByUsername(username, authenticatedUser);
    }

}
