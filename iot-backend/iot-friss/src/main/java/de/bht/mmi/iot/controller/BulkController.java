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
            @RequestParam(value = "start") String start,
            @RequestParam(value = "end") String end,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "page_size", required = false, defaultValue = "100") int pageSize,
            @RequestParam(value = "sort_order", required = false, defaultValue = "desc") String sort)
            throws EntityNotFoundException, BadRequestException {
        try {
            final DateTime startDate = DateTime.parse(start, ISODateTimeFormat.dateTime());
            final DateTime endDate = DateTime.parse(end, ISODateTimeFormat.dateTime());
            final Sort.Direction sortDirection = Sort.Direction.fromString(sort);
            return bulkService.findBySensorIdAndBulkReceivedBetween(sensorId,
                    startDate, endDate,
                    page, pageSize, sortDirection);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException(e.getMessage());
        }
    }

}
