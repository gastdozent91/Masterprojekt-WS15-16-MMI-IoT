package de.bht.mmi.iot.service;

import de.bht.mmi.iot.dto.UserPostDto;
import de.bht.mmi.iot.dto.UserPutDto;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(@Validated UserPostDto dto) {
        final User user = new User(dto.getUsername(), dto.getPassword());
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setRoles(dto.getRoles());
        return userRepository.save(user);
    }

    @Override
    public User updateUser(String username, UserPutDto dto) {
        final User user = userRepository.findOne(username);
        if (user == null)
            throw new UsernameNotFoundException(String.format("User with username: %s not found", username));

        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setRoles(dto.getRoles());
        return userRepository.save(user);
    }
}
