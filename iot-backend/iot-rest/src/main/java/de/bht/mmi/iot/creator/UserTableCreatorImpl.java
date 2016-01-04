package de.bht.mmi.iot.creator;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.model.*;
import org.joda.time.DateTime;
import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class UserTableCreatorImpl implements UserTableCreator{

    AmazonDynamoDBClient client;
    DynamoDB dynamoDB;
    String tableName;

    public UserTableCreatorImpl() {
        client = new AmazonDynamoDBClient();
        client.setEndpoint("http://localhost:8000");
        dynamoDB = new DynamoDB(client);
        tableName = "User";
    }

    public String createUserTable() throws Exception {
        Table table = dynamoDB.createTable(tableName,
                Arrays.asList(
                        new KeySchemaElement("id", KeyType.HASH)),
                Arrays.asList(
                        new AttributeDefinition("id", ScalarAttributeType.S)),
                new ProvisionedThroughput(10L, 10L));

        return "Table status: " + table.getDescription().getTableStatus();
    }

    public String deleteUserTable() throws Exception {
        Table table = dynamoDB.getTable(tableName);
        try {
            table.delete();
            table.waitForDelete();
            return  tableName+"-Table succussfully deleted";
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return "DeleteTable request failed for " + tableName;
        }
    }
}
