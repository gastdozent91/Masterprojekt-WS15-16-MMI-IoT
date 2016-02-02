package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.BadRequestException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.model.Bulk;
import de.bht.mmi.iot.repository.BulkRepository;
import de.bht.mmi.iot.service.BulkService;
import org.joda.time.DateTime;
import org.joda.time.format.ISODateTimeFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bulk")
public class BulkController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BulkController.class);

    @Autowired
    private BulkService bulkService;

    @Autowired
    private BulkRepository bulkRepository;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize(RoleConstants.HAS_ROLE_ADMIN)
    public Page<Bulk> getAllBySensorIdAndBulkReceivedBeforeXorAfter(
            @RequestParam("sensor_id") String sensorId,
            @RequestParam(value = "before", required = false) String before,
            @RequestParam(value = "after", required = false) String after,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "100") int pageSize,
            @RequestParam(value = "sort_order", required = false, defaultValue = "desc") String sort)
            throws EntityNotFoundException, BadRequestException {


        if (!((before != null) ^ (after != null))) {
            throw new BadRequestException("Parameters 'before' and 'after' are exclusive or.");
        }
        final String date = (before != null) ? before : after;
        Sort.Direction sortDirection;
        DateTime dateTime;
        try {
            sortDirection = Sort.Direction.fromString(sort);
            dateTime = DateTime.parse(date, ISODateTimeFormat.dateTime());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(e.getMessage());
        }

        Page<Bulk> result;
        if (before != null) {
            result = bulkService.findBySensorIdAndBulkReceivedBefore(sensorId, dateTime, page, pageSize,
                    sortDirection);
        } else {
            result = bulkService.findBySensorIdAndBulkReceivedAfter(sensorId, dateTime, page, pageSize,
                    sortDirection);
        }
        return result;

    }

}
