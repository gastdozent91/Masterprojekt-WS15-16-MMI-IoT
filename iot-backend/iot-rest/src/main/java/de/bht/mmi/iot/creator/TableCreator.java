package de.bht.mmi.iot.creator;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;

@EnableScan
public interface TableCreator {

    String TABLENAME_USER = "User";

    String TABLENAME_SENSOR = "Sensor";

    String createUserTable();

    String createSensorTable();

    String deleteTable(String tableName);
}
