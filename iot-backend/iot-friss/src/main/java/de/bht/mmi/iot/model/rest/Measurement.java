package de.bht.mmi.iot.model.rest;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import de.bht.mmi.iot.constants.DbConstants;
import org.springframework.data.annotation.Id;

@DynamoDBTable(tableName = DbConstants.TABLENAME_MEASUREMENT)
public class Measurement {

    @Id
    private MeasurementId measurementId;

    @DynamoDBHashKey(attributeName = "SensorId")
    public String getSensorId() {
        return measurementId != null ? measurementId.getSensorId() : null;
    }

    public void setSensorId(String sensorId) {
        if (measurementId == null) {
            measurementId = new MeasurementId();
        }
        this.measurementId.setSensorId(sensorId);
    }


}
