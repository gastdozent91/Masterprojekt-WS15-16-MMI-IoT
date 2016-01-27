package de.bht.mmi.iot.service;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.model.*;
import com.amazonaws.services.dynamodbv2.util.Tables;
import de.bht.mmi.iot.config.DynamoDBConfig;
import de.bht.mmi.iot.constants.DbConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class TableServiceImpl implements TableService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TableServiceImpl.class);

    @Autowired
    private DynamoDBConfig dynamoDBConfig;

    @Autowired
    private AmazonDynamoDB dynamoDB;

    public void createUserTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition(DbConstants.ATTRIBUTE_USERNAME, ScalarAttributeType.S)),
                DbConstants.TABLENAME_USER,
                Arrays.asList(new KeySchemaElement(DbConstants.ATTRIBUTE_USERNAME, KeyType.HASH)),
                dynamoDBConfig.getProvisionedThroughput());
        LOGGER.info(generateTableStatusLogMessage(
                DbConstants.TABLENAME_USER, createTableResult.getTableDescription().getTableStatus()));
    }

    public void createSensorTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition(DbConstants.ATTRIBUTE_ID, ScalarAttributeType.S)),
                DbConstants.TABLENAME_SENSOR,
                Arrays.asList(new KeySchemaElement(DbConstants.ATTRIBUTE_ID, KeyType.HASH)),
                dynamoDBConfig.getProvisionedThroughput());
        LOGGER.info(generateTableStatusLogMessage(
                DbConstants.TABLENAME_SENSOR, createTableResult.getTableDescription().getTableStatus()));
    }

    @Override
    public void createGatewayTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition(DbConstants.ATTRIBUTE_ID, ScalarAttributeType.S)),
                DbConstants.TABLENAME_GATEWAY,
                Arrays.asList(new KeySchemaElement(DbConstants.ATTRIBUTE_ID, KeyType.HASH)),
                dynamoDBConfig.getProvisionedThroughput());
        LOGGER.info(generateTableStatusLogMessage(
                DbConstants.TABLENAME_GATEWAY, createTableResult.getTableDescription().getTableStatus()));
    }

    @Override
    public void createClusterTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition(DbConstants.ATTRIBUTE_ID, ScalarAttributeType.S)),
                DbConstants.TABLENAME_CLUSTER,
                Arrays.asList(new KeySchemaElement(DbConstants.ATTRIBUTE_ID, KeyType.HASH)),
                dynamoDBConfig.getProvisionedThroughput());
        LOGGER.info(generateTableStatusLogMessage(
                DbConstants.TABLENAME_CLUSTER, createTableResult.getTableDescription().getTableStatus()));
    }

    @Override
    public void createMeasurementTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition(DbConstants.ATTRIBUTE_SENSOR_ID, ScalarAttributeType.S),
                        new AttributeDefinition(DbConstants.ATTRIBUTE_TIME_OF_MEASUREMENT, ScalarAttributeType.S)),
                DbConstants.TABLENAME_MEASUREMENT,
                Arrays.asList(new KeySchemaElement(DbConstants.ATTRIBUTE_SENSOR_ID, KeyType.HASH),
                        new KeySchemaElement(DbConstants.ATTRIBUTE_TIME_OF_MEASUREMENT, KeyType.RANGE)),
                dynamoDBConfig.getProvisionedThroughput());
        LOGGER.info(generateTableStatusLogMessage(
                DbConstants.TABLENAME_MEASUREMENT, createTableResult.getTableDescription().getTableStatus()));
    }

    public List<String> getTableNames() {
        return DbConstants.getAllTableNames();
    }

    public void deleteTable(String tableName) {
        if (Tables.doesTableExist(dynamoDB, tableName)) {
            final DeleteTableResult deleteTableResult = dynamoDB.deleteTable(tableName);
            LOGGER.info("Table: " + tableName + " deleted -- Table status: " + deleteTableResult.getTableDescription().getTableStatus());
        } else {
            LOGGER.info("Table: " + tableName + " doesn't exist");
        }
    }

    private String generateTableStatusLogMessage(String tableName, String status) {
        return String.format("Table '%s' status: %s", tableName, status);
    }

    public boolean doesTableExists(String tableName) {
        return Tables.doesTableExist(dynamoDB, tableName);
    }

}
