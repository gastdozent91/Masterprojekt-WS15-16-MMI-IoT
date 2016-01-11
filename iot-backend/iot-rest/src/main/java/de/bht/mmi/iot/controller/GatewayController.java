package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.creator.TableCreator;
import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.repository.GatewayRepository;
import de.bht.mmi.iot.repository.SensorRepository;
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
    private SensorRepository sensorRepository;

    @Autowired
    private TableCreator tableCreator;

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    public Gateway createGateway(@RequestBody Gateway gateway) {
        return gatewayRepository.save(gateway);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Gateway> getAllGateways() {
        return gatewayRepository.findAll();
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, consumes = "application/json")
    public Gateway updateGateway(@PathVariable("id") String id, @RequestBody Gateway gateway) {
        try {
            Gateway oldGateway = gatewayRepository.findOne(id);
            if (oldGateway != null && !oldGateway.equals(gateway)) {
                oldGateway.setName(gateway.getName());
                return gatewayRepository.save(oldGateway);
            } else {
                throw new Exception("Gateway not found with id: "+id);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error updating Gateway");
            return null;
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public String deleteGateway(@PathVariable("id") String id) {
        try {
            gatewayRepository.delete(id);
            return "Gateway with id: " + id + " succussfully deleted";
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return "Error deleting Gateway";
        }
    }

    @RequestMapping(value = "/{id}/sensor",method = RequestMethod.PUT, consumes = "application/json")
    public Gateway updateGatewaySensorList(@PathVariable("id") String id, @RequestBody ArrayList<String> sensorList) {
        try {
            Gateway gateway = gatewayRepository.findOne(id);

            if (gateway != null) {
                gateway.setSensorList(sensorList);
            }
            return gatewayRepository.save(gateway);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            System.err.println("Error attaching Sensor to Gateway: "+id);
            return null;
        }
    }

    @RequestMapping(value = "/{id}/sensor", method = RequestMethod.GET)
    public Iterable<Sensor> getAllAttachedSensors(@PathVariable("id") String id) {
        try {
            Gateway gateway = gatewayRepository.findOne(id);
            ArrayList<Sensor> sensorList = new ArrayList<Sensor>();
            if (gateway.getSensorList() != null) {
                for (String sensorID : gateway.getSensorList()) {
                    sensorList.add(sensorRepository.findOne(sensorID));
                }
            }
            return  sensorList;
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            System.err.println("Error requesting sensorList for Gateway: "+id);
        }
        return null;
    }

    // Table Create/Delete


    @RequestMapping(value = "/createTable")
    public String createTable() throws Exception {
        return tableCreator.createGatewayTable();
    }

    @RequestMapping(value = "/deleteTable")
    public String deleteTable() throws Exception {
        return tableCreator.deleteTable(TableCreator.TABLENAME_GATEWAY);
    }
}
