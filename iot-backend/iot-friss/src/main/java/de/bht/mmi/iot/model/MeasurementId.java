package de.bht.mmi.iot.model;

import org.joda.time.DateTime;

import java.io.Serializable;

public class MeasurementId implements Serializable {

    private String sensorId;

    private DateTime timeOfMeasurement;

    //@DynamoDBHashKey
    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    //@DynamoDBRangeKey
    //@DynamoDBMarshalling(marshallerClass = JodaDateTimeMarshaller.class)
    public DateTime getTimeOfMeasurement() {
        return timeOfMeasurement;
    }

    public void setTimeOfMeasurement(DateTime timeOfMeasurement) {
        this.timeOfMeasurement = timeOfMeasurement;
    }

}
