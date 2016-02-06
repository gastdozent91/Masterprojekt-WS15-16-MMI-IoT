package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityExistsException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

    Iterable<User> getAll();

    Iterable<User> getAll(UserDetails authenticatedUser) throws NotAuthorizedException;

    User loadUserByUsername(String username) throws EntityNotFoundException;

    User loadUserByUsername(String username, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    User save(User user);

    User save(User user, UserDetails authenticatedUser) throws NotAuthorizedException, EntityNotFoundException;

    User saveOnlyIfNotPresent(User user, UserDetails authenticatedUser) throws NotAuthorizedException, EntityExistsException, EntityNotFoundException;

    void deleteUser(String username) throws EntityNotFoundException;

    void deleteUser(String username, UserDetails authenticatedUser) throws EntityNotFoundException, NotAuthorizedException;

    boolean isRolePresent(UserDetails userDetails, String role);

    boolean isAnyRolePresent(UserDetails userDetails, String... roles);

    boolean isUsernameAlreadyInUse(String username);

}
