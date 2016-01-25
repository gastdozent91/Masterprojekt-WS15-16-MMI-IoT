package de.bht.mmi.iot.repository;

import de.bht.mmi.iot.constants.DbConstants;
import de.bht.mmi.iot.model.Measurement;
import de.bht.mmi.iot.model.MeasurementId;
import org.joda.time.DateTime;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

@EnableScan
public interface MeasurementRepository extends PagingAndSortingRepository<Measurement, MeasurementId> {

    Page<Measurement> findBySensorIdAndTimeOfMeasurementBefore(
            @Param(DbConstants.ATTRIBUTE_SENSOR_ID) String sensorId,
            @Param(DbConstants.ATTRIBUTE_TIME_OF_MEASUREMENT) DateTime timeOfMeasurement,
            Pageable pageable);

    Page<Measurement> findBySensorIdAndTimeOfMeasurementAfter(
            @Param(DbConstants.ATTRIBUTE_SENSOR_ID) String sensorId,
            @Param(DbConstants.ATTRIBUTE_TIME_OF_MEASUREMENT) DateTime timeOfMeasurement,
            Pageable pageable);

}
