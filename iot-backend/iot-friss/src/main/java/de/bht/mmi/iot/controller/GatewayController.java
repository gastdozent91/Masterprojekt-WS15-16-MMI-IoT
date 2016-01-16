package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.service.GatewayService;
import de.bht.mmi.iot.service.TableCreatorService;
import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.repository.GatewayRepository;
import de.bht.mmi.iot.repository.SensorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;

@RestController
@RequestMapping("/gateway")
public class GatewayController {

    @Autowired
    private GatewayRepository gatewayRepository;

    @Autowired
    private GatewayService gatewayService;

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private TableCreatorService tableCreator;

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    public Gateway createGateway(@RequestBody Gateway gateway) {
        return gatewayService.createGateway(gateway);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Gateway> getAllGateways() {
        return gatewayService.getAll();
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public Gateway updateGateway(@PathVariable("id") String id, @RequestBody Gateway gateway) {
        return gatewayService.updateGateway(id,gateway);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public String deleteGateway(@PathVariable("id") String id) {
        return gatewayService.deleteGateway(id);
    }

    @RequestMapping(value = "/{id}/sensor",method = RequestMethod.PUT, consumes = "application/json")
    public Gateway updateGatewaySensorList(@PathVariable("id") String id, @RequestBody ArrayList<String> sensorList) {
        return gatewayService.updateGatewaySensorList(id, sensorList);
    }

    @RequestMapping(value = "/{id}/sensor", method = RequestMethod.GET)
    public Iterable<Sensor> getAllAttachedSensors(@PathVariable("id") String id) {
        return gatewayService.getAllAttachedSensors(id);
    }

    // Table Create/Delete


    @RequestMapping(value = "/createTable")
    public String createTable() throws Exception {
        return tableCreator.createGatewayTable();
    }

    @RequestMapping(value = "/deleteTable")
    public String deleteTable() throws Exception {
        return tableCreator.deleteTable(TableCreatorService.TABLENAME_GATEWAY);
    }
}
