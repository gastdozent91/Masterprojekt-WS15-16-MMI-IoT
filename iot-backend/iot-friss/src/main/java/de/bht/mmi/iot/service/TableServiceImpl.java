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

import static de.bht.mmi.iot.constants.DbConstants.*;

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
    public void createBulkTable() {
        final CreateTableResult createTableResult = dynamoDB.createTable(
                Arrays.asList(new AttributeDefinition(DbConstants.ATTRIBUTE_SENSOR_ID, ScalarAttributeType.S),
                        new AttributeDefinition(DbConstants.ATTRIBUTE_BULK_RECEIVED, ScalarAttributeType.S)),
                DbConstants.TABLENAME_BULK,
                Arrays.asList(new KeySchemaElement(DbConstants.ATTRIBUTE_SENSOR_ID, KeyType.HASH),
                        new KeySchemaElement(DbConstants.ATTRIBUTE_BULK_RECEIVED, KeyType.RANGE)),
                dynamoDBConfig.getProvisionedThroughput());
        LOGGER.info(generateTableStatusLogMessage(
                DbConstants.TABLENAME_BULK, createTableResult.getTableDescription().getTableStatus()));
    }

    @Override
    public List<String> getTableNames() {
        return DbConstants.getAllTableNames();
    }

    @Override
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

    @Override
    public boolean doesTableExists(String tableName) {
        return Tables.doesTableExist(dynamoDB, tableName);
    }

    @Override
    public void createTableForName(String tableName) {
        switch (tableName) {
            case TABLENAME_USER:
                createUserTable();
                break;
            case TABLENAME_SENSOR:
                createSensorTable();
                break;
            case TABLENAME_GATEWAY:
                createGatewayTable();
                break;
            case TABLENAME_CLUSTER:
                createClusterTable();
                break;
            case TABLENAME_BULK:
                createBulkTable();
                break;
            default:
                throw new IllegalArgumentException(String.format("Table name '%s' is unknown", tableName));
        }
    }

}
