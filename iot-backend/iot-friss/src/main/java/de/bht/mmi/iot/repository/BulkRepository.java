package de.bht.mmi.iot.repository;

import de.bht.mmi.iot.constants.DbConstants;
import de.bht.mmi.iot.model.Bulk;
import de.bht.mmi.iot.model.BulkId;
import org.joda.time.DateTime;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

@EnableScan
public interface BulkRepository extends PagingAndSortingRepository<Bulk, BulkId> {

    Page<Bulk> findBySensorIdAndBulkReceivedBefore(
            @Param(DbConstants.ATTRIBUTE_SENSOR_ID) String sensorId,
            @Param(DbConstants.ATTRIBUTE_BULK_RECEIVED) DateTime bulkReceived,
            Pageable pageable);

    Page<Bulk> findBySensorIdAndBulkReceivedAfter(
            @Param(DbConstants.ATTRIBUTE_SENSOR_ID) String sensorId,
            @Param(DbConstants.ATTRIBUTE_BULK_RECEIVED) DateTime bulkReceived,
            Pageable pageable);

}
