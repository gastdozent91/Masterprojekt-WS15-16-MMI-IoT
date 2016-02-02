package de.bht.mmi.iot.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMarshalling;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import de.bht.mmi.iot.converter.JodaDateTimeMarshaller;
import org.joda.time.DateTime;

public class BulkId {

    private String sensorId;

    private DateTime bulkReceived;

    @DynamoDBHashKey
    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    @DynamoDBRangeKey
    @DynamoDBMarshalling(marshallerClass = JodaDateTimeMarshaller.class)
    public DateTime getBulkReceived() {
        return bulkReceived;
    }

    public void setBulkReceived(DateTime bulkReceived) {
        this.bulkReceived = bulkReceived;
    }
}
