package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Bulk;
import org.joda.time.DateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;

public interface BulkService {

    Iterable<Bulk> save(Iterable<Bulk> bulks);

    Bulk save(Bulk bulk);

    Page<Bulk> findBySensorIdAndBulkReceivedBefore(
            String sensorId, DateTime before, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException;

    Page<Bulk> findBySensorIdAndBulkReceivedAfter(
            String sensorId, DateTime after, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException;

    Page<Bulk> findBySensorIdAndBulkReceivedBetween(
            String sensorId, DateTime start, DateTime end, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException;

    Page<Bulk> findBySensorIdAndBulkReceivedBetween(
            String sensorId, DateTime start, DateTime end, int page, int pageSize, Sort.Direction sortDirection,
            UserDetails authenticatedUser) throws EntityNotFoundException, NotAuthorizedException;

}
