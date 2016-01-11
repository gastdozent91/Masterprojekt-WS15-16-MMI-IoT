package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.UserPostDto;
import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.model.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {

    User saveUser(UserPostDto dto);

    User updateUser(String username, UserPutDto dto) throws UsernameNotFoundException;

}
