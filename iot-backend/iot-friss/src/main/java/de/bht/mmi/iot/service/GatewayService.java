package de.bht.mmi.iot.service;

import de.bht.mmi.iot.model.rest.Gateway;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface GatewayService {

    Iterable<Gateway> getAll();

    Iterable<Gateway> getAllForIds(String... ids);

    Gateway getGateway(String id);

    Gateway createGateway(@RequestBody Gateway gateway);

    Gateway updateGateway(@PathVariable("id") String id, @RequestBody Gateway gateway, UserDetails userDetails);

    void deleteGateway(@PathVariable("id") String id);
}
