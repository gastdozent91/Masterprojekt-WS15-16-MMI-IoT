package de.bht.mmi.iot.creator;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;

@EnableScan
public interface TableCreator {

    final String TABLENAME_USER = "User";
    final String TABLENAME_SENSOR = "Sensor";
    final String TABLENAME_GATEWAY = "Gateway";

    String createUserTable();

    String createSensorTable();

    String createGatewayTable();

    String deleteTable(String tableName);

}
