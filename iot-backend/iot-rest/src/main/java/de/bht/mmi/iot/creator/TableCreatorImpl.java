package de.bht.mmi.iot.creator;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.model.*;
import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Arrays;

@Component
public class TableCreatorImpl implements TableCreator {

    AmazonDynamoDBClient client;
    DynamoDB dynamoDB;

    public TableCreatorImpl() {
        client = new AmazonDynamoDBClient();
        client.setEndpoint("http://192.168.99.100:8000");
        dynamoDB = new DynamoDB(client);
    }

    public String createUserTable() throws Exception {
        Table table = dynamoDB.createTable(TABLENAME_USER,
                Arrays.asList(
                        new KeySchemaElement("userID", KeyType.HASH)),
                Arrays.asList(
                        new AttributeDefinition("userID", ScalarAttributeType.S)),
                new ProvisionedThroughput(10L, 10L));

        return "Table status: " + table.getDescription().getTableStatus();
    }

    public String createSensorTable() throws Exception {
        Table table = dynamoDB.createTable(TABLENAME_SENSOR,
                Arrays.asList(
                        new KeySchemaElement("sensorID", KeyType.HASH)),
                Arrays.asList(
                        new AttributeDefinition("sensorID", ScalarAttributeType.S)),
                new ProvisionedThroughput(10L, 10L));

        return "Table status: " + table.getDescription().getTableStatus();
    }

    @Override
    public String createGatewayTable() throws Exception {
        Table table = dynamoDB.createTable(TABLENAME_GATEWAY,
                Arrays.asList(
                        new KeySchemaElement("gatewayID", KeyType.HASH)),
                Arrays.asList(
                        new AttributeDefinition("gatewayID", ScalarAttributeType.S)),
                new ProvisionedThroughput(10L, 10L));

        return "Table status: " + table.getDescription().getTableStatus();
    }

    public String deleteTable(String tableName) throws Exception {
        Table table = dynamoDB.getTable(tableName);
        try {
            table.delete();
            table.waitForDelete();
            return  tableName +"-Table succussfully deleted";
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return "DeleteTable request failed for " + tableName;
        }
    }
}
