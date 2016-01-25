package de.bht.mmi.iot.repository;

import de.bht.mmi.iot.model.Measurement;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;

@EnableScan
public interface MeasurementRepository extends CrudRepository<Measurement, String>{

}
