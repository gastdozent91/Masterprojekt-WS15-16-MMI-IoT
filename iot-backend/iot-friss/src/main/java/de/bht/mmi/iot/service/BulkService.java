package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.model.Bulk;
import org.joda.time.DateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

public interface BulkService {

    Iterable<Bulk> save(Iterable<Bulk> measurements);

    Bulk save(Bulk measurement);

    Page<Bulk> findBySensorIdAndBulkReceivedBefore(
            String sensorId, DateTime before, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException;

    Page<Bulk> findBySensorIdAndBulkReceivedAfter(
            String sensorId, DateTime after, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException;

}
