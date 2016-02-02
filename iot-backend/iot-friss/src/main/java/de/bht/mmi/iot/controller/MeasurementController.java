package de.bht.mmi.iot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/measurement")
public class MeasurementController {

//    private static final Logger LOGGER = LoggerFactory.getLogger(MeasurementController.class);
//
//    @Autowired
//    private MeasurementService measurementService;
//
//    @Autowired
//    private MeasurementRepository measurementRepository;
//
//    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
//    public Page<Measurement> getAllBySensorIdAndTimeOfMeasurementBefore(
//            @RequestParam("sensor_id") String sensorId,
//            @RequestParam(value = "before", required = false) String before,
//            @RequestParam(value = "after", required = false) String after,
//            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
//            @RequestParam(value = "page_size", required = false, defaultValue = "100") int pageSize,
//            @RequestParam(value = "sort_order", required = false, defaultValue = "desc") String sort)
//            throws EntityNotFoundException, BadRequestException {
//
//
//        if (!((before != null) ^ (after != null))) {
//            throw new BadRequestException("Parameters 'before' and 'after' are exclusive or.");
//        }
//        final String date = (before != null) ? before : after;
//        Sort.Direction sortDirection;
//        DateTime dateTime;
//        try {
//            sortDirection = Sort.Direction.fromString(sort);
//            dateTime = DateTime.parse(date, ISODateTimeFormat.dateTime());
//        } catch (IllegalArgumentException e) {
//            throw new BadRequestException(e.getMessage());
//        }
//
//        Page<Measurement> result;
//        if (before != null) {
//            result = measurementService.findBySensorIdAndTimeOfMeasurementBefore(sensorId, dateTime, page, pageSize,
//                    sortDirection);
//        } else {
//            result = measurementService.findBySensorIdAndTimeOfMeasurementAfter(sensorId, dateTime, page, pageSize,
//                    sortDirection);
//        }
//        return result;
//
//    }


}
