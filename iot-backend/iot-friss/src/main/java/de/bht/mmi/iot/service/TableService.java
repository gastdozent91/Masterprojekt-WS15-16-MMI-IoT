package de.bht.mmi.iot.service;

import java.util.List;

public interface TableService {

    void createUserTable();

    void createSensorTable();

    void createGatewayTable();

    void createClusterTable();

    void createMeasurementTable();

    void createBulkTable();

    List<String> getTableNames();

    void deleteTable(String tableName);

    boolean doesTableExists(String tableName);

}
