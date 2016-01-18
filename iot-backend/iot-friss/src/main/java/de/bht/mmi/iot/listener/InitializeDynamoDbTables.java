package de.bht.mmi.iot.listener;

import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.dto.UserPostDto;
import de.bht.mmi.iot.model.rest.Cluster;
import de.bht.mmi.iot.model.rest.Gateway;
import de.bht.mmi.iot.constants.RoleConstants;
import de.bht.mmi.iot.model.rest.Sensor;
import de.bht.mmi.iot.model.rest.User;
import de.bht.mmi.iot.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;

@Component
public class InitializeDynamoDbTables implements ApplicationListener<ContextRefreshedEvent> {

    private final Logger LOGGER = LoggerFactory.getLogger(InitializeDynamoDbTables.class);

    @Autowired
    private TableCreatorService tableCreator;

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
        LOGGER.info(event.getClass().getName() + " received!");

        // initialize Authorization
        initAuth();

        // recreate tables and add dummy data
        recreateTables();
        addDummyData();

        // clear Authorization
        clearAuth();
    }

    private void recreateTables() {
        final ArrayList<String> tableNames = getTableNames();
        deleteTables(tableNames);
        tableCreator.createUserTable();
        tableCreator.createSensorTable();
        tableCreator.createGatewayTable();
        tableCreator.createClusterTable();
    }

    private void addDummyData() {

        User user = userService.createUser(new UserPostDto("admin", "admin", "max", "mustermann", new HashSet<String>(Arrays.asList(RoleConstants.ROLE_ADMIN))));
        LOGGER.info(String.format("User %s created", user.getUsername()));

        UserDetails userDetails = userDetailsService.loadUserByUsername("admin");

        Sensor sensor = sensorService.createSensor(new SensorPostDto(true, "Berlin, Germany", "", 0), userDetails);
        LOGGER.info(String.format("Sensor %s created", sensor.getId()));
        Sensor sensor2 = sensorService.createSensor(new SensorPostDto(true, "13.301172256,52.44152832,33.4", "", 0), userDetailsService.loadUserByUsername("admin"));
        LOGGER.info(String.format("Sensor %s created", sensor2.getId()));
        Sensor sensor3 = sensorService.createSensor(new SensorPostDto(true, "$GPGGA,160955.000,5226.4877,N,01318.0644,E,1,11,0.79,35.1,M,44.9,M,,*50", "", 0), userDetailsService.loadUserByUsername("admin"));
        LOGGER.info(String.format("Sensor %s created", sensor3.getId()));

        Gateway gateway = gatewayService.createGateway(new Gateway("gateway1", new ArrayList<String>()));
        LOGGER.info(String.format("Gateway %s created", gateway.getName()));

        Cluster cluster = clusterService.createCluster(new Cluster("cluster1","gateway1",null));
        LOGGER.info(String.format("Cluster %s created", cluster.getName()));

        ArrayList<String> sensorList = new ArrayList<String>();
        sensorList.add(sensor.getId());
        sensorList.add(sensor2.getId());
        sensorList.add(sensor3.getId());
        userService.updateUserSensors(user.getUsername(), sensorList);
        LOGGER.info(String.format("Added Sensors %s %s %s to User %s",sensor.getId(),sensor2.getId(),sensor3.getId(),user.getUsername()));

        cluster.setSensorList(sensorList);
        clusterService.updateCluster(cluster.getId(),cluster,userDetails);
        LOGGER.info(String.format("Added Sensors %s %s %s to Cluster %s",sensor.getId(),sensor2.getId(),sensor3.getId(),cluster.getName()));

        ArrayList<String> clusterList = new ArrayList<String>();
        clusterList.add(cluster.getId());
        gateway.setClusterList(clusterList);
        gatewayService.updateGateway(gateway.getId(),gateway,userDetails);
        LOGGER.info(String.format("Added Cluster %s to Gateway %s",cluster.getName(),gateway.getName()));

    }

    private ArrayList<String> getTableNames() {
        return tableCreator.getTableNames();
    }

    private void deleteTables(ArrayList<String> tableNames) {
        for (String tableName : tableNames) {
            tableCreator.deleteTable(tableName);
        }
    }

    private void initAuth() {
        Collection<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(RoleConstants.ROLE_ADMIN);

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                "admin",
                "admin",
                authorities
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void clearAuth() {
        SecurityContextHolder.getContext().setAuthentication(null);
    }

}
