package de.bht.mmi.iot.service;

import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.model.Measurement;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.repository.MeasurementRepository;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class MeasurementServiceImpl implements MeasurementService {

    @Autowired
    private MeasurementRepository measurementRepository;

    @Autowired
    private SensorService sensorService;

    @Override
    public Iterable<Measurement> save(Iterable<Measurement> measurements) {
        return measurementRepository.save(measurements);
    }

    @Override
    public Measurement save(Measurement measurement) {
        return measurementRepository.save(measurement);
    }

    @Override
    public Page<Measurement> findBySensorIdAndTimeOfMeasurementBefore(
            String sensorId, DateTime before, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException {
        final Sensor sensor = sensorService.getSensor(sensorId);
        return measurementRepository.findBySensorIdAndTimeOfMeasurementBefore(
                sensor.getId(),
                before,
                new PageRequest(page, pageSize, new Sort(sortDirection, "timeOfMeasurement")));
    }

    @Override
    public Page<Measurement> findBySensorIdAndTimeOfMeasurementAfter(
            String sensorId, DateTime after, int page, int pageSize, Sort.Direction sortDirection)
            throws EntityNotFoundException {
        final Sensor sensor = sensorService.getSensor(sensorId);
        return measurementRepository.findBySensorIdAndTimeOfMeasurementAfter(
                sensor.getId(),
                after,
                new PageRequest(page, pageSize, new Sort(sortDirection, "timeOfMeasurement")));
    }

}

