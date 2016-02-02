package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.repository.GatewayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Arrays;

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
    public Gateway createGateway(Gateway gateway) throws EntityNotFoundException {
        userService.loadUserByUsername(gateway.getOwner());
        return gatewayRepository.save(gateway);
    }

    @Override
    public Gateway updateGateway(String gatewayId, Gateway gateway, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        final Gateway oldGateway = getGateway(gatewayId);
        userService.loadUserByUsername(authenticatedUser.getUsername());

        if ((oldGateway != null && oldGateway.getOwner().equals(authenticatedUser.getUsername())) ||
                userService.isRolePresent(authenticatedUser, RoleConstants.ROLE_ADMIN)) {
            gateway.setId(gatewayId);
            return gatewayRepository.save(gateway);
        } else {
            throw new NotAuthorizedException(
                    String.format("You are not authorized to update gateway with id '%s'", gatewayId));
        }
    }

    @Override
    public void deleteGateway(String gatewayId) throws EntityNotFoundException {
        getGateway(gatewayId);
        gatewayRepository.delete(gatewayId);
    }

}
