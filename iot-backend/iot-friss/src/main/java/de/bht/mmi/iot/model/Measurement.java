package de.bht.mmi.iot.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMarshalling;
import com.fasterxml.jackson.annotation.JsonProperty;
import de.bht.mmi.iot.converter.JodaDateTimeMarshaller;
import org.joda.time.DateTime;

import java.util.List;

@DynamoDBDocument
public class Measurement {

    @JsonProperty("id")
    private String sensorId;

    @JsonProperty("time")
    private DateTime timeOfMeasurement;

    private List<Number> acceleration;

    private List<Number> orientation;

    private String location;

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    @DynamoDBMarshalling(marshallerClass = JodaDateTimeMarshaller.class)
    public DateTime getTimeOfMeasurement() {
        return timeOfMeasurement;
    }

    public void setTimeOfMeasurement(DateTime timeOfMeasurement) {
        this.timeOfMeasurement = timeOfMeasurement;
    }

    public List<Number> getAcceleration() {
        return acceleration;
    }

    public void setAcceleration(List<Number> acceleration) {
        this.acceleration = acceleration;
    }

    public List<Number> getOrientation() {
        return orientation;
    }

    public void setOrientation(List<Number> orientation) {
        this.orientation = orientation;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
