package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityExistsException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.SensorRepository;
import de.bht.mmi.iot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @Override
    public Iterable<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Iterable<User> getAll(UserDetails authenticatedUser) throws NotAuthorizedException {
        if (!isRolePresent(authenticatedUser, RoleConstants.ROLE_ADMIN)) {
            throw new NotAuthorizedException("You are not authorized to access all users");
        }
        return userRepository.findAll();
    }

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
            throw new NotAuthorizedException(String.format("You are not authorized to access user '%s'", username));
        }
        return loadUserByUsername(username);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User save(User user, UserDetails authenticatedUser) throws NotAuthorizedException, EntityNotFoundException {
        if (isRolePresent(authenticatedUser, RoleConstants.ROLE_ADMIN)) {
            return save(user);
        }

        // Non admin users can only change their password, first name and last name
        final User oldUser = loadUserByUsername(user.getUsername(), authenticatedUser);
        oldUser.setPassword(user.getPassword());
        oldUser.setFirstname(user.getFirstname());
        oldUser.setLastname(user.getLastname());
        return save(oldUser);
    }

    @Override
    public User saveOnlyIfNotPresent(User user, UserDetails authenticatedUser)
            throws NotAuthorizedException, EntityExistsException, EntityNotFoundException {
        final String username = user.getUsername();
        if (isUsernameAlreadyInUse(username)) {
            throw new EntityExistsException(String.format("User with username '%s' already exists", username));
        }
        return save(user, authenticatedUser);
    }

    @Override
    public void deleteUser(String username) throws EntityNotFoundException {
        loadUserByUsername(username);
        userRepository.delete(username);
    }

    @Override
    public void deleteUser(String username, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        if (!isRolePresent(authenticatedUser, RoleConstants.ROLE_ADMIN)) {
            throw new NotAuthorizedException(String.format("You are not authorized to delete user '%s'", username));
        }
        deleteUser(username);
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
    public boolean isAnyRolePresent(UserDetails userDetails, String... roles) {
        for (String role : roles) {
            if (isRolePresent(userDetails, role)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean isUsernameAlreadyInUse(String username) {
        return userRepository.findOne(username) != null ? true: false;
    }

}
