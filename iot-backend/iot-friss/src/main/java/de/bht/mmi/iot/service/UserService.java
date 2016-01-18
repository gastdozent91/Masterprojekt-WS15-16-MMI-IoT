package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.UserPostDto;
import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.model.rest.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;

public interface UserService {

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    Iterable<User> getAllUsers();

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    User getUser(String username, UserDetails userDetails);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    User createUser(UserPostDto dto);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    User updateUser(String username, UserPutDto dto, UserDetails userDetails);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    void deleteUser(String username);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    User updateUserSensors(String username, List<String> sensorList);

    boolean isRolePresent(UserDetails userDetails, String role);

}
