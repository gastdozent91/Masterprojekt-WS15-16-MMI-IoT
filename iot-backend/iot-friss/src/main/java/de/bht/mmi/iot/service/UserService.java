package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.model.rest.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {

    User loadUserByUsername(String username);

    User loadUserByUsername(String username, UserDetails authenticatedUser);

    Iterable<User> loadAllUsers();

    User saveUser(User user);

    User updateUser(User user);

    User updateUser(User user, UserDetails authenticatedUser);

    User updateUser(String username, UserPutDto user, UserDetails authenticatedUser);

    void deleteUser(String username);

    User updateUserSensors(String username, List<String> sensorList);

    boolean isRolePresent(UserDetails userDetails, String role);

}
