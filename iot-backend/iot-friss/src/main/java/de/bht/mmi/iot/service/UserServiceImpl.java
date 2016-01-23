package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.exception.EntityExistsException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.rest.User;
import de.bht.mmi.iot.repository.SensorRepository;
import de.bht.mmi.iot.repository.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @Override
    public User loadUserByUsername(String username) throws EntityNotFoundException {
        final User user = userRepository.findOne(username);
        if (user == null) {
            throw new EntityNotFoundException(String.format("User with username '%s' not found", username));
        }
        return user;
    }
    @Override
    public User loadUserByUsername(String username, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        if (!(isRolePresent(authenticatedUser, RoleConstants.ROLE_ADMIN) ||
                authenticatedUser.getUsername().equals(username))) {
            throw new NotAuthorizedException(String.format("You are not authorzid to access user '%s'", username));
        }
        return loadUserByUsername(username);
    }

    @Override
    public Iterable<User> loadAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User saveUser(@Validated User user) throws EntityExistsException {
        final String username = user.getUsername();
        if (isUsernameAlreadyInUse(username)) {
            throw new EntityExistsException(String.format("Username '%s' already in use", username));
        }
        return userRepository.save(user);
    }

    @Override
    public User updateUser(@Validated User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(@Validated User user, UserDetails authenticatedUser) throws NotAuthorizedException {
        if (!(isRolePresent(authenticatedUser, RoleConstants.ROLE_ADMIN) ||
                authenticatedUser.getUsername().equals(user.getUsername()))) {
            throw new NotAuthorizedException(
                    String.format("You are not authorzid to update user '%s'", user.getUsername()));
        }
        return updateUser(user);
    }

    @Override
    public User updateUser(String username, @Validated UserPutDto dto, UserDetails authenticatedUser)
            throws NotAuthorizedException {

        User user = userRepository.findOne(username);
        if (user == null) {
            user = new User(username, dto.getPassword());
        }
        user.setPassword(dto.getPassword());
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        // TODO: Prevent that admin user leave role ADMIN
        // TODO: Prevent that user can change their own roles
        user.setRoles(dto.getRoles());
        return updateUser(user, authenticatedUser);
    }

    @Override
    public void deleteUser(String username) throws EntityNotFoundException {
        final User user = loadUserByUsername(username);
        userRepository.delete(username);
    }

    @Override
    public User updateUserSensors(String username, List<String> sensorList, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        final User user = loadUserByUsername(username, authenticatedUser);

        // Check if every sensorId references a known sensor
        final List<String> notFoundSensorIds = new ArrayList<>(sensorList.size());
        for (String sensorId : sensorList) {
            if (sensorRepository.findOne(sensorId) == null) {
                notFoundSensorIds.add(sensorId);
            }
        }
        if (!notFoundSensorIds.isEmpty()) {
            throw new EntityNotFoundException(String.format(
                    "The following sensorIds do not reference known sensors: %s",
                    StringUtils.join(notFoundSensorIds, ", ")));
        }

        user.setSensorList(sensorList);
        return userRepository.save(user);
    }

    @Override
    public boolean isRolePresent(UserDetails userDetails, String role) {
        boolean isRolePresent = false;
        for (GrantedAuthority grantedAuthority : userDetails.getAuthorities()) {
            isRolePresent = grantedAuthority.getAuthority().equals(role);
            if (isRolePresent)
                break;
        }
        return isRolePresent;
    }

    @Override
    public boolean isUsernameAlreadyInUse(String username) {
        return userRepository.findOne(username) != null ? true: false;
    }

}
