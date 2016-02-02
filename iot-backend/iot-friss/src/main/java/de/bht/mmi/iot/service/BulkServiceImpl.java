package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.model.Bulk;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.repository.BulkRepository;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class BulkServiceImpl implements BulkService {

    @Autowired
    private BulkRepository bulkRepository;

    @Autowired
    private SensorService sensorService;

    @Override
    public Iterable<Bulk> save(Iterable<Bulk> measurements) {
        return bulkRepository.save(measurements);
    }

    @Override
    public Bulk save(Bulk measurement) {
        return bulkRepository.save(measurement);
    }

    @Override
    public Page<Bulk> findBySensorIdAndBulkReceivedBefore(
            String sensorId, DateTime before, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException {
        final Sensor sensor = sensorService.getSensor(sensorId);
        return bulkRepository.findBySensorIdAndBulkReceivedBefore(
                sensor.getId(),
                before,
                new PageRequest(page, pageSize, new Sort(sortDirection, "bulkReceived")));
    }

    @Override
    public Page<Bulk> findBySensorIdAndBulkReceivedAfter(
            String sensorId, DateTime after, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException {
        final Sensor sensor = sensorService.getSensor(sensorId);
        return bulkRepository.findBySensorIdAndBulkReceivedAfter(
                sensor.getId(),
                after,
                new PageRequest(page, pageSize, new Sort(sortDirection, "bulkReceived")));
    }

}

