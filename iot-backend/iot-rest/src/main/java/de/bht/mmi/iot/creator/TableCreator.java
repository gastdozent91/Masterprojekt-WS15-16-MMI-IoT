package de.bht.mmi.iot.creator;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.context.annotation.Bean;

@EnableScan
public interface TableCreator {

    final String TABLENAME_USER = "User";
    final String TABLENAME_SENSOR = "Sensor";

    public String createUserTable() throws Exception;

    public String createSensorTable() throws Exception;

    public String deleteTable(String tableName) throws Exception;
}
