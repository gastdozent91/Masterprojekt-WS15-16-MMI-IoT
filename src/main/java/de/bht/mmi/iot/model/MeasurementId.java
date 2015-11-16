package de.bht.mmi.iot.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;

import java.io.Serializable;

public class MeasurementId implements Serializable {

    private static final long serialVersionUID = 1L;

    private String sensorId;

    private String measurementDateTime;

    @DynamoDBHashKey
    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    @DynamoDBRangeKey
    public String getMeasurementDateTime() {
        return measurementDateTime;
    }

    public void setMeasurementDateTime(String measurementDateTime) {
        this.measurementDateTime = measurementDateTime;
    }
}
