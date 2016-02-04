package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.GatewayRepository;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;

import static de.bht.mmi.iot.constants.RoleConstants.*;

@Service
public class GatewayServiceImpl implements GatewayService {

    @Autowired
    private GatewayRepository gatewayRepository;

    @Autowired
    private UserService userService;

    @Override
    public Iterable<Gateway> getAll() {
        return gatewayRepository.findAll();
    }

    @Override
    public Iterable<Gateway> getAll(UserDetails authenticatedUser) throws EntityNotFoundException {
        final String username = authenticatedUser.getUsername();
        if (userService.isAnyRolePresent(authenticatedUser, ROLE_ADMIN, ROLE_GET_ALL_GATEWAY)) {
            return getAll();
        } else {
            final Set<Gateway> result = new HashSet<>();
            CollectionUtils.addAll(result, getAllByOwner(username));
            CollectionUtils.addAll(result, getAllReleasedForUser(username));
            return result;
        }
    }

    @Override
    public Iterable<Gateway> getAllReleasedForUser(String username) throws EntityNotFoundException {
        final User user = userService.loadUserByUsername(username);
        final Iterable<Gateway> userGateways = gatewayRepository.findAll(user.getReleasedForGateways());
        return userGateways != null ? userGateways : Collections.emptyList();
    }

    @Override
    public Iterable<Gateway> getAllForIds(String... gatewayId) {
        return gatewayRepository.findAll(Arrays.asList(gatewayId));
    }

    @Override
    public Iterable<Gateway> getAllByOwner(String username) {
        return gatewayRepository.findAllByOwner(username);
    }

    @Override
    public Gateway getGateway(String gatewayId) throws EntityNotFoundException {
        Gateway gateway = gatewayRepository.findOne(gatewayId);
        if (gateway != null) {
            return gateway;
        } else {
            throw new EntityNotFoundException(String.format("Gateway with id '%s' not found", gatewayId));
        }
    }

    @Override
    public Gateway saveGateway(Gateway gateway) throws EntityNotFoundException {
        userService.loadUserByUsername(gateway.getOwner());
        return gatewayRepository.save(gateway);
    }

    @Override
    public Gateway saveGateway(Gateway gateway, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {

        Gateway oldGateway = null;
        if (gateway.getId() != null) {
            oldGateway = gatewayRepository.findOne(gateway.getId());
        }

        if (oldGateway == null) {
            if (userService.isAnyRolePresent(authenticatedUser, ROLE_ADMIN, ROLE_CREATE_GATEWAY)) {
                return saveGateway(gateway);
            }
        } else {
            if (userService.isAnyRolePresent(authenticatedUser, ROLE_ADMIN, ROLE_UPDATE_GATEWAY)
                    || oldGateway.getOwner().equals(authenticatedUser.getUsername())) {
                return saveGateway(gateway);
            }
        }
        throw new NotAuthorizedException("You are not authorized to save/update gateways");
    }

    @Override
    public void deleteGateway(String gatewayId) throws EntityNotFoundException {
        getGateway(gatewayId);
        gatewayRepository.delete(gatewayId);
    }

    @Override
    public void deleteGateway(String gatewayId, UserDetails authenticatedUser) throws EntityNotFoundException, NotAuthorizedException {
        final Gateway gateway = getGateway(gatewayId);
        if (userService.isAnyRolePresent(authenticatedUser, ROLE_ADMIN, ROLE_DELETE_GATEWAY)
                || gateway.getOwner().equals(authenticatedUser.getUsername())) {
            gatewayRepository.delete(gateway);
            return;
        }
        throw new NotAuthorizedException(
                String.format("You are not authorized to delete gateway with id '%s'", gateway.getId()));
    }

}
