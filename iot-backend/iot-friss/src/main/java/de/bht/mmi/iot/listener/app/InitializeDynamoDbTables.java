package de.bht.mmi.iot.listener.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.bht.mmi.iot.config.DbInitMode;
import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.exception.EntityExistsException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.model.Cluster;
import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.UserRepository;
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
    private UserRepository userRepository;

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
        LOGGER.info("Initialize database in mode: '{}'", dbInitMode.getPropertyValue());
        try {
            switch (dbInitMode) {
                case VALIDATE:
                    validateTables();
                    break;
                case CREATE_MISSING:
                    createMissingTables();
                    break;
                case DROP_CREATE:
                    recreateTables();
                    break;
                default:
                    throw new RuntimeException(String.format("Unsupported dbInitMode: '%s' ",
                            dbInitMode.getPropertyValue()));
            }
            createAdmin();
            if (addDummyData) {
                addDummyData();
            }
        } catch (EntityNotFoundException | EntityExistsException | IOException e) {
            throw new RuntimeException(String.format("Unable to initialize database in mode: '%s'",
                    dbInitMode.getPropertyValue()), e);
        }
    }

    /**
     * Poor validation - checks only if tables with names exists
     */
    private void validateTables() {
        LOGGER.info("Validate tables");
        final List<String> missingTables = getMissingTables();
        if (!missingTables.isEmpty()) {
            throw new RuntimeException(String.format(
                    "Table validation failed. The following tables are not present: %s",
                    StringUtils.join(missingTables, ", ")));
        }
    }

    private void createMissingTables() throws EntityExistsException {
        LOGGER.info("Create missing tables");
        final List<String> missingTables = getMissingTables();
        if (missingTables.size() == 0) {
            LOGGER.info("No missing tables found");
            return;
        }
        for (String missingTable : missingTables) {
            tableService.createTableForName(missingTable);
        }
    }

    private List<String> getMissingTables() {
        final List<String> missingTables = new ArrayList<>();
        for (String tableName : tableService.getTableNames()) {
            if (!tableService.doesTableExists(tableName)) {
                missingTables.add(tableName);
            }
        }
        return missingTables;
    }

    private void recreateTables() {
        LOGGER.info("Recreate tables");
        final List<String> tableNames = tableService.getTableNames();
        deleteTables(tableNames.toArray(new String[tableNames.size()]));

        tableService.createUserTable();
        tableService.createSensorTable();
        tableService.createGatewayTable();
        tableService.createClusterTable();
        tableService.createBulkTable();
    }

    private void addDummyData() throws IOException, EntityExistsException, EntityNotFoundException {
        LOGGER.warn("Add dummy data to database, which could overwrite existing data");

        final DummyData dummyData = objectMapper.readValue(dummyDataResource.getFile(), DummyData.class);

        // User
        final List<User> users = dummyData.getUsers();
        for (User user : users) {
            userService.save(user);
            LOGGER.info("User '{}' created", user.getUsername());
        }

        // Gateway
        final List<Gateway> gateways = dummyData.getGateways();
        for (Gateway gateway : gateways) {
            gatewayService.save(gateway);
            LOGGER.info("Gateway '{}' with id '{}' created", gateway.getName(), gateway.getId());
        }

        //Cluster
        final List<Cluster> clusters = dummyData.getClusters();
        for (Cluster cluster : clusters) {
            clusterService.save(cluster);
            LOGGER.info("Cluster '{}' with id '{}' created", cluster.getName(), cluster.getId());
        }

        // Sensor
        final List<Sensor> sensors = dummyData.getSensors();
        for (Sensor sensor : sensors) {
            sensorService.save(sensor);
            LOGGER.info("Sensor '{}' with id '{}' created", sensor.getName(), sensor.getId());
        }

    }

    private void deleteTables(String... tableNames) {
        for (String tableName : tableNames) {
            tableService.deleteTable(tableName);
        }
    }

    private void createAdmin() {
        LOGGER.info("Create admin user with username '{}'", adminUsername);
        User admin = userRepository.findOne(adminUsername);
        if (admin != null) {
            LOGGER.warn("User '{}' already present in database", admin.getUsername());
            if (!userService.isRolePresent(admin, RoleConstants.ROLE_ADMIN)) {
                LOGGER.warn("User '{}' does not have the role {}. Adding now", adminUsername, RoleConstants.ROLE_ADMIN);
                admin.addRole(RoleConstants.ROLE_ADMIN);
            }
        } else {
            admin = new User(adminUsername, adminPassword);
            admin.addRole(RoleConstants.ROLE_ADMIN);
            LOGGER.info("Admin user with username '{}' successfully created", admin.getUsername());
        }
        userRepository.save(admin);
    }

}
