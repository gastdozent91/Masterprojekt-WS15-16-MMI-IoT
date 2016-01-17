package de.bht.mmi.iot.service;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;

@Service
public class TableCreatorImpl implements TableCreatorService {

    @Autowired
    private AmazonDynamoDB dynamoDB;

    Logger LOGGER = LoggerFactory.getLogger(TableCreatorImpl.class);

    public String createUserTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition("username", ScalarAttributeType.S)),
                TABLENAME_USER,
                Arrays.asList(new KeySchemaElement("username", KeyType.HASH)),
                new ProvisionedThroughput(10L, 10L));
        LOGGER.info("Table: User created -- Table status: " + createTableResult.getTableDescription().getTableStatus());
        return "Table status: " + createTableResult.getTableDescription().getTableStatus();
    }

    public String createSensorTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition("sensorID", ScalarAttributeType.S)),
                TABLENAME_SENSOR,
                Arrays.asList(new KeySchemaElement("sensorID", KeyType.HASH)),
                new ProvisionedThroughput(10L, 10L));
        LOGGER.info("Table: Sensor created -- Table status: " + createTableResult.getTableDescription().getTableStatus());
        return "Table status: " + createTableResult.getTableDescription().getTableStatus();
    }

    @Override
    public String createGatewayTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition("gatewayID", ScalarAttributeType.S)),
                TABLENAME_GATEWAY,
                Arrays.asList(new KeySchemaElement("gatewayID", KeyType.HASH)),
                new ProvisionedThroughput(10L, 10L));
        LOGGER.info("Table: Gateway created -- Table status: " + createTableResult.getTableDescription().getTableStatus());
        return "Table status: " + createTableResult.getTableDescription().getTableStatus();
    }

    public ArrayList<String> getTableNames() {
        final ListTablesResult listTablesResult = dynamoDB.listTables();
        ArrayList<String> tableNames = new ArrayList<String>();
        for (String tableName : listTablesResult.getTableNames()) {
            if (tableName.equals(TABLENAME_GATEWAY) || tableName.equals(TABLENAME_SENSOR) || tableName.equals(TABLENAME_USER)) {
                tableNames.add(tableName);
            }
        }
        return tableNames;
    }

    public String deleteTable(String tableName) {
        final DeleteTableResult deleteTableResult = dynamoDB.deleteTable(tableName);
        LOGGER.info("Table: "+tableName+" deleted -- Table status: " + deleteTableResult.getTableDescription().getTableStatus());
        return "Table status: " + deleteTableResult.getTableDescription().getTableStatus();
    }
}
