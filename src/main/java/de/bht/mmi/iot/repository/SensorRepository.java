package de.bht.mmi.iot.repository;

import de.bht.mmi.iot.model.Sensor;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

@EnableScan
public interface SensorRepository extends CrudRepository<Sensor, String> {

    List<Sensor> findByName(String name);

}
