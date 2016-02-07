package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.exception.EntityExistsException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<User> getAllUser(@AuthenticationPrincipal UserDetails authenticatedUser)
            throws NotAuthorizedException {
        return userService.getAll(authenticatedUser);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUser(@PathVariable("username") String username, @AuthenticationPrincipal UserDetails authenticatedUser)
            throws NotAuthorizedException, EntityNotFoundException {
        return userService.loadUserByUsername(username, authenticatedUser);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody @Validated User user, @AuthenticationPrincipal UserDetails authenticatedUser)
            throws EntityExistsException, NotAuthorizedException, EntityNotFoundException {
        return userService.saveOnlyIfNotPresent(user, authenticatedUser);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public User updateUser(@PathVariable("username") String username,
                           @RequestBody @Validated User user,
                           @AuthenticationPrincipal UserDetails authenticatedUser)
            throws NotAuthorizedException, EntityNotFoundException {
        user.setUsername(username);
        return userService.save(user, authenticatedUser);
    }

    // DELETE
    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable("username") String username,
                           @AuthenticationPrincipal UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        userService.delete(username, authenticatedUser);
    }

}
