package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.model.rest.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {

    Iterable<User> getAllUsers();

    User getUser(String username);

    User getUser(String username, UserDetails userDetails);

    User saveUser(User user);

    User updateUser(String username, UserPutDto dto, UserDetails userDetails);

    void deleteUser(String username);

    User updateUserSensors(String username, List<String> sensorList);

    boolean isRolePresent(UserDetails userDetails, String role);

}
