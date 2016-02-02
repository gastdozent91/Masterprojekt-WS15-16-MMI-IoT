package de.bht.mmi.iot.repository;

import de.bht.mmi.iot.model.Cluster;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

@EnableScan
public interface ClusterRepository extends CrudRepository<Cluster, String> {

    Iterable<Cluster> findAllByOwner(@Param("owner") String owner);

}
