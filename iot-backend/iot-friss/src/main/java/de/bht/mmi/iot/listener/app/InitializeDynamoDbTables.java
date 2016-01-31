package de.bht.mmi.iot.listener.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.bht.mmi.iot.config.DbInitMode;
import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityExistsException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.Cluster;
import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.service.*;
import de.bht.mmi.iot.util.DummyData;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
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

    @Autowired
    private ObjectMapper objectMapper;

    @Value("classpath:dummy-data.json")
    private Resource dummyDataResource;

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
        } catch (NotAuthorizedException | EntityNotFoundException | EntityExistsException | IOException e) {
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

    private void addDummyData() throws NotAuthorizedException, EntityNotFoundException, EntityExistsException, IOException {

        final DummyData dummyData = objectMapper.readValue(dummyDataResource.getFile(), DummyData.class);

        // User
        final List<User> users = dummyData.getUsers();
        for (User user : users) {
            userService.saveUser(user);
            LOGGER.info(String.format("User '%s' created", user.getUsername()));
        }

        // Gateway
        final List<Gateway> gateways = dummyData.getGateways();
        for (Gateway gateway : gateways) {
            gatewayService.createGateway(gateway);
            LOGGER.info(String.format("Gateway '%s' with id '%s' created", gateway.getName(), gateway.getId()));
        }

        //Cluster
        final List<Cluster> clusters = dummyData.getClusters();
        for (Cluster cluster : clusters) {
            clusterService.createCluster(cluster);
            LOGGER.info(String.format("Cluster '%s' with id '%s' created", cluster.getName(), cluster.getId()));
        }

        // Sensor
        final List<Sensor> sensors = dummyData.getSensors();
        for (Sensor sensor : sensors) {
            sensorService.createSensor(sensor);
            LOGGER.info(String.format("Sensor '%s' with id '%s' created", sensor.getName(), sensor.getId()));
        }

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
