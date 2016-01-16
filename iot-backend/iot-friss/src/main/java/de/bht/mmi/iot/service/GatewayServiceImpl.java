package de.bht.mmi.iot.service;

import de.bht.mmi.iot.model.Gateway;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.repository.GatewayRepository;
import de.bht.mmi.iot.repository.SensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;

@Service
public class GatewayServiceImpl implements GatewayService{

    @Autowired
    private GatewayRepository gatewayRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @Override
    public Iterable<Gateway> getAll() {
        return gatewayRepository.findAll();
    }

    @Override
    public Gateway createGateway(@RequestBody Gateway gateway) {
        return gatewayRepository.save(gateway);
    }

    @Override
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

    @Override
    public String deleteGateway(@PathVariable("id") String id) {
        try {
            gatewayRepository.delete(id);
            return "Gateway with id: " + id + " succussfully deleted";
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return "Error deleting Gateway";
        }
    }

    @Override
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

    @Override
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
}
