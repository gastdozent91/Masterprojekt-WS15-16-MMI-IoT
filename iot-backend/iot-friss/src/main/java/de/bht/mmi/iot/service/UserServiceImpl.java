package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.dto.UserPostDto;
import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.model.rest.User;
import de.bht.mmi.iot.repository.SensorRepository;
import de.bht.mmi.iot.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SensorRepository sensorRepository;

    Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(String username, UserDetails userDetails) {
        if (!(isRolePresent(userDetails, RoleConstants.ROLE_ADMIN) || userDetails.getUsername().equals(username))) {
            // TODO: More meaningfuel exception message
            throw new AccessDeniedException("Operation not permitted");
        }
        User user = userRepository.findOne(username);
        if (user != null) {
            return user;
        } else {
            throw new EntityNotFoundException(String.format("User with username '%s' not found!",username));
        }
    }

    @Override
    public User createUser(@Validated UserPostDto dto) {
        final String dtoUsername = dto.getUsername();
        if (isUsernameAlreadyInUse((dtoUsername))) {
            throw new EntityExistsException(String.format("Username '%s' already in use", dtoUsername));
        }

        final User user = new User(dtoUsername, dto.getPassword());
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setRoles(dto.getRoles());
        user.setSensorList(new ArrayList<String>());
        return userRepository.save(user);
    }

    @Override
    public User saveUser(User user) {
        final String username = user.getUsername();
        if (isUsernameAlreadyInUse(username)) {
            throw new EntityExistsException(String.format("Username '%s' already in use", username));
        }
        return userRepository.save(user);
    }

    @Override
    public User updateUser(String username, @Validated UserPutDto dto, UserDetails userDetails) {
        // Role admin can change all users, other roles can only change their own data
        if (!(isRolePresent(userDetails, RoleConstants.ROLE_ADMIN) || userDetails.getUsername().equals(username))) {
            // TODO: More meaningfuel exception message
            throw new AccessDeniedException("Operation not permitted");
        }

        final User user = userRepository.findOne(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User with username '%s' not found", username));
        }
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setPassword(dto.getPassword());
        // TODO: Prevent that admin user leave role ADMIN
        // TODO: Prevent that user can change their roles
        user.setRoles(dto.getRoles());
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(String username) {
        userRepository.delete(username);
        LOGGER.debug("User with username: " + username + " succussfully deleted");
    }

    @Override
    public User updateUserSensors(String username, List<String> sensorList) {

        User user = userRepository.findOne(username);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("User with username '%s' not found", username));
        }


        if (!(isRolePresent(user, RoleConstants.ROLE_ADMIN) || user.getUsername().equals(username))) {
            // TODO: More meaningfuel exception message
            throw new AccessDeniedException("Operation not permitted");
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

    public boolean isUsernameAlreadyInUse(String username) {
        return userRepository.findOne(username) != null ? true: false;
    }
}
