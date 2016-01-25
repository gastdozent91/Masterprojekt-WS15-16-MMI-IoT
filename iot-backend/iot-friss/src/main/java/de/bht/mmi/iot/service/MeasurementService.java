package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.model.Measurement;
import org.joda.time.DateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

public interface MeasurementService {

    Measurement save(Measurement measurement);

    Page<Measurement> findBySensorIdAndTimeOfMeasurementBefore(
            String sensorId, DateTime before, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException;

    Page<Measurement> findBySensorIdAndTimeOfMeasurementAfter(
            String sensorId, DateTime after, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException;

}
