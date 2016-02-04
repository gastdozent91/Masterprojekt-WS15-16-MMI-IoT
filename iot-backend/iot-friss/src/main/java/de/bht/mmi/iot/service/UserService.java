package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.exception.EntityExistsException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {

    User loadUserByUsername(String username) throws EntityNotFoundException;

    User loadUserByUsername(String username, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    Iterable<User> loadAllUsers();

    User saveUser(User user) throws EntityExistsException;

    User updateUser(User user);

    User updateUser(User user, UserDetails authenticatedUser) throws NotAuthorizedException;

    User updateUser(String username, UserPutDto user, UserDetails authenticatedUser) throws NotAuthorizedException;

    void deleteUser(String username) throws EntityNotFoundException;

    User updateUserReleasedForSensors(String username, List<String> sensorIds, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    User updateUserReleasedForGateways(String username, List<String> gatewayIds, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    User updateUserReleasedForClusters(String username, List<String> clusterIds, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    boolean isRolePresent(UserDetails userDetails, String role);

    boolean isAnyRolePresent(UserDetails userDetails, String... roles);

    boolean isUsernameAlreadyInUse(String username);

}
