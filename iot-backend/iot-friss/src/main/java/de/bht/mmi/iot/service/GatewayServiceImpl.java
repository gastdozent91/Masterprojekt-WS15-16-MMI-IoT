package de.bht.mmi.iot.service;

import de.bht.mmi.iot.model.rest.Gateway;
import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.model.rest.User;
import de.bht.mmi.iot.repository.GatewayRepository;
import de.bht.mmi.iot.repository.SensorRepository;
import de.bht.mmi.iot.repository.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.EntityNotFoundException;

@Service
public class GatewayServiceImpl implements GatewayService{

    @Autowired
    private GatewayRepository gatewayRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private UserRepository userRepository;

    private Logger LOGGER = LoggerFactory.getLogger(GatewayServiceImpl.class);

    @Override
    public Iterable<Gateway> getAll() {
        return gatewayRepository.findAll();
    }

    @Override
    public Gateway getGateway(String id) {
        Gateway gateway = gatewayRepository.findOne(id);
        if (gateway != null) {
            return gateway;
        } else {
            throw new EntityNotFoundException(String.format("Gateway with id '%s' not found!",id));
        }
    }

    @Override
    public Gateway createGateway(@RequestBody Gateway gateway) {
        return gatewayRepository.save(gateway);
    }

    @Override
    public Gateway updateGateway(@PathVariable("id") String id, @RequestBody Gateway gateway, UserDetails userDetails) {
        Gateway oldGateway = gatewayRepository.findOne(id);
        User user = userRepository.findOne(userDetails.getUsername());
        if (oldGateway != null && !oldGateway.equals(gateway)) {
            if (user.getRoles().contains(RoleConstants.ROLE_ADMIN)) {
                oldGateway.setName(gateway.getName());
                oldGateway.setClusterList(gateway.getClusterList());
                return gatewayRepository.save(oldGateway);
            } else {
                throw new AccessDeniedException(String.format("No rights to access!"));
            }
        } else {
            throw new EntityNotFoundException(String.format("Gateway with id '%s' not found",id));
        }
    }

    @Override
    public void deleteGateway(@PathVariable("id") String id) {
            gatewayRepository.delete(id);
            LOGGER.debug(String.format("Gateway with id '%s' successfull deleted",id));
    }
}
