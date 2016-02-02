package de.bht.mmi.iot.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMarshalling;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import de.bht.mmi.iot.constants.DbConstants;
import de.bht.mmi.iot.converter.JodaDateTimeMarshaller;
import org.joda.time.DateTime;
import org.springframework.data.annotation.Id;

import java.util.List;

@DynamoDBTable(tableName = DbConstants.TABLENAME_BULK)
public class Bulk {

    @Id
    private BulkId bulkId;

    private List<Measurement> measurements;

    @DynamoDBHashKey(attributeName = DbConstants.ATTRIBUTE_SENSOR_ID)
    public String getSensorId() {
        return bulkId != null ? bulkId.getSensorId() : null;
    }

    public void setSensorId(String sensorId) {
        if (bulkId == null) {
            bulkId = new BulkId();
        }
        this.bulkId.setSensorId(sensorId);
    }

    @DynamoDBRangeKey(attributeName = DbConstants.ATTRIBUTE_BULK_RECEIVED)
    @DynamoDBMarshalling(marshallerClass = JodaDateTimeMarshaller.class)
    public DateTime getBulkReceived() {
        return bulkId != null ? bulkId.getBulkReceived() : null;
    }

    public void setBulkReceived(DateTime bulkReceived) {
        if (bulkId == null) {
            bulkId = new BulkId();
        }
        bulkId.setBulkReceived(bulkReceived);
    }
    
    public List<Measurement> getMeasurements() {
        return measurements;
    }

    public void setMeasurements(List<Measurement> measurements) {
        this.measurements = measurements;
    }

}
