package de.bht.mmi.iot.service;

import java.util.ArrayList;

public interface TableCreatorService {

    void createUserTable();

    void createSensorTable();

    void createGatewayTable();

    void createClusterTable();

    ArrayList<String> getTableNames();

    void deleteTable(String tableName);

}
