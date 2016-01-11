package de.bht.mmi.iot.repository;

import de.bht.mmi.iot.model.Sensor2;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

@Deprecated
@EnableScan
public interface SensorRepository2 extends CrudRepository<Sensor2, String> {

    List<Sensor2> findByName(String name);

}
