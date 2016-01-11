package de.bht.mmi.iot.creator;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class TableCreatorImpl implements TableCreator {

    @Autowired
    private AmazonDynamoDB dynamoDB;

    public String createUserTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition("username", ScalarAttributeType.S)),
                TABLENAME_USER,
                Arrays.asList(new KeySchemaElement("username", KeyType.HASH)),
                new ProvisionedThroughput(10L, 10L));
        return "Table status: " + createTableResult.getTableDescription().getTableStatus();
    }

    public String createSensorTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition("sensorID", ScalarAttributeType.S)),
                TABLENAME_SENSOR,
                Arrays.asList(new KeySchemaElement("sensorID", KeyType.HASH)),
                new ProvisionedThroughput(10L, 10L));
        return "Table status: " + createTableResult.getTableDescription().getTableStatus();
    }

    @Override
    public String createGatewayTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition("gatewayID", ScalarAttributeType.S)),
                TABLENAME_GATEWAY,
                Arrays.asList(new KeySchemaElement("gatewayID", KeyType.HASH)),
                new ProvisionedThroughput(10L, 10L));

        return "Table status: " + createTableResult.getTableDescription().getTableStatus();
    }

    public String deleteTable(String tableName) {
        final DeleteTableResult deleteTableResult = dynamoDB.deleteTable(tableName);
        return "Table status: " + deleteTableResult.getTableDescription().getTableStatus();
    }
}
