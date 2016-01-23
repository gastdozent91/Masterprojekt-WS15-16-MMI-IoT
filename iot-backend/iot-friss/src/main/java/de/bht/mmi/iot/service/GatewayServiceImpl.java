package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.rest.Gateway;
import de.bht.mmi.iot.model.rest.User;
import de.bht.mmi.iot.repository.GatewayRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class GatewayServiceImpl implements GatewayService {

    @Autowired
    private GatewayRepository gatewayRepository;

    @Autowired
    private SensorService sensorService;

    @Autowired
    private UserService userService;

    private Logger LOGGER = LoggerFactory.getLogger(GatewayServiceImpl.class);

    @Override
    public Iterable<Gateway> getAll() {
        return gatewayRepository.findAll();
    }

    @Override
    public Iterable<Gateway> getAllForIds(String... gatewayId) {
        return gatewayRepository.findAll(Arrays.asList(gatewayId));
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
    public Gateway createGateway(Gateway gateway) {
        return gatewayRepository.save(gateway);
    }

    @Override
    public Gateway updateGateway(String gatewayId, Gateway gateway, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        final Gateway oldGateway = getGateway(gatewayId);
        final User user = userService.loadUserByUsername(authenticatedUser.getUsername());
        if (oldGateway != null && !oldGateway.equals(gateway)) {
            if (user.getRoles().contains(RoleConstants.ROLE_ADMIN)) {
                oldGateway.setName(gateway.getName());
                return gatewayRepository.save(oldGateway);
            } else {
                throw new NotAuthorizedException(String.format("You are not authorized to access gateway with id '%s'", gatewayId));
            }
        } else {
            throw new EntityNotFoundException(String.format("Gateway with id '%s' not found", gatewayId));
        }
    }

    @Override
    public void deleteGateway(String gatewayId) throws EntityNotFoundException {
        getGateway(gatewayId);
        gatewayRepository.delete(gatewayId);
        LOGGER.debug(String.format("Gateway with id '%s' deleted", gatewayId));
    }

}
