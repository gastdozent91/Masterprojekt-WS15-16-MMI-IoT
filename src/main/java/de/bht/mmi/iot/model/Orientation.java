package de.bht.mmi.iot.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import org.springframework.data.annotation.Id;

@DynamoDBTable(tableName = "Measurement")
public final class Orientation {

    @Id
    private MeasurementId measurementId;

    private float w;

    private float x;

    private float y;

    private float z;

    @DynamoDBHashKey(attributeName = "SensorId")
    public String getSensorId() {
        return measurementId != null ? measurementId.getSensorId() : null;
    }

    public void setSensorId(String sensorId) {
        if (measurementId == null) {
            measurementId = new MeasurementId();
        }
        measurementId.setSensorId(sensorId);
    }

    @DynamoDBRangeKey(attributeName = "MeasurementDateTime")
    public String getMeasurementDateTime() {
        return measurementId != null ? measurementId.getMeasurementDateTime() : null;
    }

    public void setMeasurementDateTime(String measurementDateTime) {
        if (measurementDateTime == null) {
            measurementId = new MeasurementId();
        }
        measurementId.setMeasurementDateTime(measurementDateTime);
    }

    @DynamoDBAttribute(attributeName = "W")
    public float getW() {
        return w;
    }

    public void setW(float w) {
        this.w = w;
    }

    @DynamoDBAttribute(attributeName = "X")
    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    @DynamoDBAttribute(attributeName = "Y")
    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    @DynamoDBAttribute(attributeName = "Z")
    public float getZ() {
        return z;
    }

    public void setZ(float z) {
        this.z = z;
    }

}
