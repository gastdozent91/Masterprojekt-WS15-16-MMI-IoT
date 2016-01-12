package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.UserPostDto;
import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.model.RoleConstants;
import de.bht.mmi.iot.model.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    Iterable<User> getAllUsers();

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    User saveUser(UserPostDto dto);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN_OR_USER)
    User updateUser(String username, UserPutDto dto, UserDetails userDetails);

    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    void deleteUser(String username);

    boolean isRolePresent(UserDetails userDetails, String role);

}
