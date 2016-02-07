package de.bht.mmi.iot.service;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Bulk;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.repository.BulkRepository;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.stream.StreamSupport;

@Service
public class BulkServiceImpl implements BulkService {

    @Autowired
    private BulkRepository bulkRepository;

    @Autowired
    private SensorService sensorService;

    @Autowired
    private UserService userService;

    @Override
    public Iterable<Bulk> save(Iterable<Bulk> bulks) {
        return bulkRepository.save(bulks);
    }

    @Override
    public Bulk save(Bulk bulk) {
        return bulkRepository.save(bulk);
    }

    @Override
    public Page<Bulk> findBySensorIdAndBulkReceivedBefore(
            String sensorId, DateTime before, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException {
        final Sensor sensor = sensorService.getOne(sensorId);
        return bulkRepository.findBySensorIdAndBulkReceivedBefore(
                sensor.getId(),
                before,
                new PageRequest(page, pageSize, new Sort(sortDirection, "bulkReceived")));
    }

    @Override
    public Page<Bulk> findBySensorIdAndBulkReceivedAfter(
            String sensorId, DateTime after, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException {
        final Sensor sensor = sensorService.getOne(sensorId);
        return bulkRepository.findBySensorIdAndBulkReceivedAfter(
                sensor.getId(),
                after,
                new PageRequest(page, pageSize, new Sort(sortDirection, "bulkReceived")));
    }

    @Override
    public Page<Bulk> findBySensorIdAndBulkReceivedBetween(
            String sensorId, DateTime start, DateTime end, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException {
        final Sensor sensor = sensorService.getOne(sensorId);
        return bulkRepository.findBySensorIdAndBulkReceivedBetween(
                sensor.getId(),
                start,
                end,
                new PageRequest(page, pageSize, new Sort(sortDirection, "bulkReceived")));
    }

    @Override
    public Page<Bulk> findBySensorIdAndBulkReceivedBetween(String sensorId, DateTime start, DateTime end,
                                                           int page, int pageSize, Sort.Direction sortDirection,
                                                           UserDetails authenticatedUser)
            throws EntityNotFoundException, NotAuthorizedException {
        if (!userService.isAnyRolePresent(authenticatedUser, RoleConstants.ROLE_ADMIN)) {
            final Iterable<Sensor> allSensorsForUser = sensorService.getAll(authenticatedUser);
            final long numFound = StreamSupport.stream(allSensorsForUser.spliterator(), false)
                    .filter(sensor -> sensorId.equals(sensor.getId()))
                    .count();
            if (numFound == 0) {
                throw new NotAuthorizedException(
                        String.format("You are not authorized to access bulks from sensor with id: '%s", sensorId));
            }
        }
        return findBySensorIdAndBulkReceivedBetween(sensorId, start, end, page, pageSize, sortDirection);
    }

}

