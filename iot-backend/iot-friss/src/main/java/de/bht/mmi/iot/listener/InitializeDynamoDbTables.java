package de.bht.mmi.iot.listener;

import de.bht.mmi.iot.constants.DbConstants;
import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.exception.EntityExistsException;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.exception.NotAuthorizedException;
import de.bht.mmi.iot.model.rest.*;
import de.bht.mmi.iot.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
@PropertySource("classpath:app.properties")
public class InitializeDynamoDbTables implements ApplicationListener<ContextRefreshedEvent> {

    private final Logger LOGGER = LoggerFactory.getLogger(InitializeDynamoDbTables.class);

    @Autowired
    private Environment env;

    @Autowired
    private TableCreatorService tableCreatorService;

    @Autowired
    private UserService userService;

    @Autowired
    private SensorService sensorService;

    @Autowired
    private GatewayService gatewayService;

    @Autowired
    private ClusterService clusterService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        // recreate tables and add dummy data
        LOGGER.info("Recreate tables");
        recreateTables();

        try {
            // Admin user
            createAdmin();
            LOGGER.info(String.format("User %s created", env.getRequiredProperty("api.user.admin.username")));

            // DummyData
            final String keyDbInitDummyData = "db.init.dummy_data";
            final String dbInitDummyData = env.getProperty(keyDbInitDummyData);
            if (dbInitDummyData == null) {
                LOGGER.warn(String.format("Property '%s' not set. No dummy data will be added to database", keyDbInitDummyData));
            }

            final boolean shouldAddDummyData = Boolean.parseBoolean(dbInitDummyData);
            if (shouldAddDummyData) {
                addDummyData();
            }
        } catch (EntityExistsException | NotAuthorizedException | EntityNotFoundException e ) {
            throw new RuntimeException("Error while initializing tables", e);
        }
    }

    private void recreateTables() {
        final List<String> tableNames = DbConstants.getAllTableNames();
        deleteTables(tableNames.toArray(new String[tableNames.size()]));

        tableCreatorService.createUserTable();
        tableCreatorService.createSensorTable();
        tableCreatorService.createGatewayTable();
        tableCreatorService.createClusterTable();
    }

    private void addDummyData() throws NotAuthorizedException, EntityNotFoundException, EntityExistsException {
        // User
        final User user = new User("max", "test123");
        user.addRole(RoleConstants.ROLE_USER);
        user.setFirstname("max");
        user.setLastname("mustermann");
        userService.saveUser(user);
        LOGGER.info(String.format("User %s created", user.getUsername()));

        UserDetails userDetails = userDetailsService.loadUserByUsername("admin");

        // Gateway
        Gateway gateway = gatewayService.createGateway(new Gateway("gateway1",user.getUsername()));
        LOGGER.info(String.format("Gateway %s created", gateway.getName()));

        //Cluster
        Cluster cluster = clusterService.createCluster(new Cluster("cluster1", user.getUsername(), null));
        LOGGER.info(String.format("Cluster %s created", cluster.getName()));

        // Sensor
        ArrayList<String> sensorTypes = new ArrayList<String>();
        sensorTypes.add(SensorType.ACCELERATION.toString());
        sensorTypes.add(SensorType.ORIENTATION.toString());

        Sensor sensor = sensorService.createSensor(
                new SensorPostDto(true, "Berlin, Germany", sensorTypes,
                        gateway.getId(), Collections.emptyList(), "Arm rechts"), userDetails);
        LOGGER.info(String.format("Sensor %s created", sensor.getId()));

        Sensor sensor2 = sensorService.createSensor(
                new SensorPostDto(true, "13.301172256,52.44152832,33.4", sensorTypes,
                        gateway.getId(), Collections.emptyList(), "Arm links"),
                userDetailsService.loadUserByUsername("admin"));
        LOGGER.info(String.format("Sensor %s created", sensor2.getId()));

        Sensor sensor3 = sensorService.createSensor(new SensorPostDto(true,
                "$GPGGA,160955.000,5226.4877,N,01318.0644,E,1,11,0.79,35.1,M,44.9,M,,*50", sensorTypes,
                gateway.getId(),
                Arrays.asList(cluster.getId()), "Kopf"), userDetailsService.loadUserByUsername("admin"));
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

    private ArrayList<String> getTableNames() {
        return tableCreatorService.getTableNames();
    }

    private void deleteTables(String... tableNames) {
        for (String tableName : tableNames) {
            tableCreatorService.deleteTable(tableName);
        }
    }

    private void createAdmin() throws EntityExistsException {
        final User admin = new User(env.getRequiredProperty("api.user.admin.username"),
                env.getRequiredProperty("api.user.admin.password"));
        admin.addRole(RoleConstants.ROLE_ADMIN);
        userService.saveUser(admin);
    }

}
