package de.bht.mmi.iot.listener.app;

import de.bht.mmi.iot.config.DbInitMode;
import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.exception.EntityExistsException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Cluster;
import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.service.*;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class InitializeDynamoDbTables implements ApplicationListener<ContextRefreshedEvent> {

    private final Logger LOGGER = LoggerFactory.getLogger(InitializeDynamoDbTables.class);

    @Value("${db.init.dummy_data}")
    private boolean addDummyData;

    @Value("${db.init.table.mode}")
    private String dbInitModeValue;

    @Value("${api.user.admin.username}")
    private String adminUsername;

    @Value("${api.user.admin.password}")
    private String adminPassword;

    @Autowired
    private TableService tableService;

    @Autowired
    private UserService userService;

    @Autowired
    private SensorService sensorService;

    @Autowired
    private GatewayService gatewayService;

    @Autowired
    private ClusterService clusterService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        final DbInitMode dbInitMode = DbInitMode.fromPropertyValue(dbInitModeValue);
        LOGGER.info(String.format("Initialize database in mode: '%s'", dbInitMode.getPropertyValue()));
        try {
            switch (dbInitMode) {
                case VALIDATE:
                    validateTables();
                    break;
                case DROP_CREATE:
                    recreateTables();
                    createAdmin();
                    if (addDummyData) {
                        addDummyData();
                    }
                    break;
                default:
                    throw new RuntimeException(String.format("Unsupported dbInitMode: '%s' ",
                            dbInitMode.getPropertyValue()));
            }
        } catch (NotAuthorizedException | EntityNotFoundException | EntityExistsException e) {
            throw new RuntimeException(String.format("Unable to initialize database in mode: '%s'",
                    dbInitMode.getPropertyValue()), e);
        }
    }

    /**
     * Poor validation - checks only if tables with names exists
     */
    private void validateTables() {
        LOGGER.info("Validate tables");
        List<String> notFoundTables = new ArrayList<>();
        for (String tableName : tableService.getTableNames()) {
            if (!tableService.doesTableExists(tableName)) {
                notFoundTables.add(tableName);
            }
        }
        if (!notFoundTables.isEmpty()) {
            throw new RuntimeException(String.format(
                    "Table validation failed. The following tables are not present: %s",
                    StringUtils.join(notFoundTables, ", ")));
        }
    }

    private void recreateTables() {
        LOGGER.info("Recreate tables");
        final List<String> tableNames = tableService.getTableNames();
        deleteTables(tableNames.toArray(new String[tableNames.size()]));

        tableService.createUserTable();
        tableService.createSensorTable();
        tableService.createGatewayTable();
        tableService.createClusterTable();
        tableService.createMeasurementTable();
    }

    private void addDummyData() throws NotAuthorizedException, EntityNotFoundException, EntityExistsException {
        // User
        final User user = new User("max", "test123");
        user.addRole(RoleConstants.ROLE_USER);
        user.setFirstname("max");
        user.setLastname("mustermann");
        userService.saveUser(user);
        LOGGER.info(String.format("User %s created", user.getUsername()));

        UserDetails userDetails = userService.loadUserByUsername("admin");

        // Gateway
        Gateway gateway = gatewayService.createGateway(new Gateway("gateway1",user.getUsername()));
        LOGGER.info(String.format("Gateway %s created", gateway.getName()));

        //Cluster
        Cluster cluster = clusterService.createCluster(new Cluster("cluster1", user.getUsername(), null));
        LOGGER.info(String.format("Cluster %s created", cluster.getName()));

        // Sensor
        ArrayList<String> sensorTypes = new ArrayList<String>();
        sensorTypes.add("acceleration");
        sensorTypes.add("orientation");

        Sensor sensor = sensorService.createSensor(
                new SensorPostDto(true, "Berlin, Germany", sensorTypes,
                        gateway.getId(), Collections.emptyList(), "Arm rechts"), userDetails);
        LOGGER.info(String.format("Sensor %s created", sensor.getId()));

        Sensor sensor2 = sensorService.createSensor(
                new SensorPostDto(true, "13.301172256,52.44152832,33.4", sensorTypes,
                        gateway.getId(), Collections.emptyList(), "Arm links"),
                userService.loadUserByUsername("admin"));
        LOGGER.info(String.format("Sensor %s created", sensor2.getId()));

        Sensor sensor3 = sensorService.createSensor(new SensorPostDto(true,
                "$GPGGA,160955.000,5226.4877,N,01318.0644,E,1,11,0.79,35.1,M,44.9,M,,*50", sensorTypes,
                gateway.getId(),
                Arrays.asList(cluster.getId()), "Kopf"), userService.loadUserByUsername("admin"));
        LOGGER.info(String.format("Sensor %s created", sensor3.getId()));


        ArrayList<String> sensorList = new ArrayList<String>();
        sensorList.add(sensor.getId());
        sensorList.add(sensor2.getId());
        sensorList.add(sensor3.getId());
        user.setSensorList(sensorList);
        userService.updateUser(user);
        LOGGER.info(String.format("Added Sensors %s, %s, %s to User %s", sensor.getId(), sensor2.getId(),
                sensor3.getId(), user.getUsername()));

        cluster.setSensorList(sensorList);
        clusterService.updateCluster(cluster.getId(), cluster, userDetails);
        LOGGER.info(String.format("Added Sensors %s, %s, %s to Cluster %s", sensor.getId(), sensor2.getId(),
                sensor3.getId(), cluster.getName()));

        ArrayList<String> clusterList = new ArrayList<String>();
        clusterList.add(cluster.getId());
        gatewayService.updateGateway(gateway.getId(),gateway,userDetails);
        LOGGER.info(String.format("Added Cluster %s to Gateway %s",cluster.getName(),gateway.getName()));

    }

    private void deleteTables(String... tableNames) {
        for (String tableName : tableNames) {
            tableService.deleteTable(tableName);
        }
    }

    private void createAdmin() throws EntityExistsException {
        final User admin = new User(adminUsername, adminPassword);
        admin.addRole(RoleConstants.ROLE_ADMIN);
        userService.saveUser(admin);
    }

}
