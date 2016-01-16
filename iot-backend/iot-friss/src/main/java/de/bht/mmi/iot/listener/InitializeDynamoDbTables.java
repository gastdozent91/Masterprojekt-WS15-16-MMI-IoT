package de.bht.mmi.iot.listener;

import de.bht.mmi.iot.dto.SensorPostDto;
import de.bht.mmi.iot.dto.UserPostDto;
import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.model.RoleConstants;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.service.GatewayService;
import de.bht.mmi.iot.service.SensorService;
import de.bht.mmi.iot.service.TableCreatorService;
import de.bht.mmi.iot.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.http.HttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import javax.servlet.http.HttpServletRequest;
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
        deleteTables(new ArrayList<String>(Arrays.asList(TableCreatorService.TABLENAME_USER,
                                                         TableCreatorService.TABLENAME_SENSOR,
                                                         TableCreatorService.TABLENAME_GATEWAY)));
        tableCreator.createUserTable();
        tableCreator.createSensorTable();
        tableCreator.createGatewayTable();
    }

    private void addDummyData() {
        userService.createUser(new UserPostDto("admin", "admin", "max", "mustermann", new HashSet<String>(Arrays.asList(RoleConstants.ROLE_ADMIN))));

        sensorService.createSensor(new SensorPostDto(true,"Berlin, Germany",null,0),userDetailsService.loadUserByUsername("admin"));
        sensorService.createSensor(new SensorPostDto(true,"13.301172256,52.44152832,33.4",null,0), userDetailsService.loadUserByUsername("admin"));
        sensorService.createSensor(new SensorPostDto(true,"$GPGGA,160955.000,5226.4877,N,01318.0644,E,1,11,0.79,35.1,M,44.9,M,,*50",null,0), userDetailsService.loadUserByUsername("admin"));

        gatewayService.createGateway(new Gateway("gateway1", new ArrayList<String>()));
        gatewayService.createGateway(new Gateway("gateway2", new ArrayList<String>()));
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
