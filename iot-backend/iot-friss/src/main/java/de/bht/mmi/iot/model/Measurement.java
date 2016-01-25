package de.bht.mmi.iot.model;

import com.amazonaws.services.dynamodbv2.datamodeling.*;
import de.bht.mmi.iot.constants.DbConstants;
import de.bht.mmi.iot.converter.JodaDateTimeMarshaller;
import org.joda.time.DateTime;
import org.springframework.data.annotation.Id;

import java.util.List;

@DynamoDBTable(tableName = DbConstants.TABLENAME_MEASUREMENT)
public class Measurement {

    @Id
    private MeasurementId measurementId;

    private List<Number> acceleration;

    private List<Number> orientation;

    private String location;

    @DynamoDBHashKey(attributeName = DbConstants.ATTRIBUTE_SENSOR_ID)
    public String getSensorId() {
        return measurementId != null ? measurementId.getSensorId() : null;
    }

    public void setSensorId(String sensorId) {
        if (measurementId == null) {
            measurementId = new MeasurementId();
        }
        this.measurementId.setSensorId(sensorId);
    }

    @DynamoDBRangeKey(attributeName = DbConstants.ATTRIBUTE_TIME_OF_MEASUREMENT)
    @DynamoDBMarshalling(marshallerClass = JodaDateTimeMarshaller.class)
    public DateTime getTimeOfMeasurement() {
        return measurementId != null ? measurementId.getTimeOfMeasurement() : null;
    }

    public void setTimeOfMeasurement(DateTime timeOfMeasurement) {
        if (measurementId == null) {
            measurementId = new MeasurementId();
        }
        measurementId.setTimeOfMeasurement(timeOfMeasurement);
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
