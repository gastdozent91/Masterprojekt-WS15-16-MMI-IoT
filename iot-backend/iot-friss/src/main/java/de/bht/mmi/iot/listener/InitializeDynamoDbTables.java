package de.bht.mmi.iot.listener;

import de.bht.mmi.iot.controller.GatewayController;
import de.bht.mmi.iot.controller.SensorController;
import de.bht.mmi.iot.controller.UserController;
import de.bht.mmi.iot.creator.TableCreator;
import de.bht.mmi.iot.dto.UserPostDto;
import de.bht.mmi.iot.model.RoleConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;

@Component
public class InitializeDynamoDbTables implements ApplicationListener<ContextRefreshedEvent> {

    private final Logger logger = LoggerFactory.getLogger(InitializeDynamoDbTables.class);

    @Autowired
    private TableCreator tableCreator;

    private UserController userController = new UserController();
    private SensorController sensorController = new SensorController();
    private GatewayController gatewayController = new GatewayController();

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        logger.info(event.getClass().getName() + " received!");

        // kommt dann hier die Initialisierung rein?
        //initializeTables();
        //addDummyData();
    }

    private void initializeTables() {
        tableCreator.createUserTable();
        tableCreator.createSensorTable();
        tableCreator.createGatewayTable();
    }

    private void addDummyData() {
        userController.createUser(new UserPostDto("maxi", "qwertz", "max", "mustermann", new HashSet<String>(Arrays.asList(RoleConstants.ROLE_ADMIN))));
    }

}
