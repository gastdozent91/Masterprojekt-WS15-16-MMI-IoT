package de.bht.mmi.iot.repository;

import de.bht.mmi.iot.model.Gateway;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

@EnableScan
public interface GatewayRepository extends CrudRepository<Gateway, String> {

    Iterable<Gateway> findAllByOwner(@Param("owner") String owner);

}
