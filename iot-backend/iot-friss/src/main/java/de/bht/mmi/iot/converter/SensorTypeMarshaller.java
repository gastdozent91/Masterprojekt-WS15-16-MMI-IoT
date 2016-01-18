package de.bht.mmi.iot.converter;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMarshaller;
import de.bht.mmi.iot.model.rest.SensorType;

public class SensorTypeMarshaller implements DynamoDBMarshaller<SensorType> {

    @Override
    public String marshall(SensorType obj) {
        return obj.name();
    }

    @Override
    public SensorType unmarshall(Class<SensorType> clazz, String json) {
        return SensorType.valueOf(json);
    }
}
