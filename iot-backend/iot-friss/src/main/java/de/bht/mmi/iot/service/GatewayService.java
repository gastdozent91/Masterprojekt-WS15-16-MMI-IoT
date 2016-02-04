package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Gateway;
import org.springframework.security.core.userdetails.UserDetails;

public interface GatewayService {

    Iterable<Gateway> getAll();

    Iterable<Gateway> getAll(UserDetails authenticatedUser) throws EntityNotFoundException;

    Iterable<Gateway> getAllForIds(String... gatewayId);

    Iterable<Gateway> getAllReleasedForUser(String username) throws EntityNotFoundException;

    Iterable<Gateway> getAllByOwner(String username);

    Gateway getGateway(String gatewayId) throws EntityNotFoundException;

    Gateway saveGateway(Gateway gateway) throws EntityNotFoundException;

    Gateway saveGateway(Gateway gateway, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;

    void deleteGateway(String gatewayId) throws EntityNotFoundException;

    void deleteGateway(String gatewayId, UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException;
}
