package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.creator.TableCreator;
import de.bht.mmi.iot.model.Sensor;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.SensorRepository;
import de.bht.mmi.iot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private TableCreator userTableCreator;

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<User> getAllUser() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.PUT, consumes = "application/json")
    public User updateUser(@PathVariable("id") String id, @RequestBody User user) {
        try {
            User oldUser = userRepository.findOne(id);
            if (oldUser != null && !oldUser.equals(user)) {
                oldUser.setFirstname(user.getFirstname());
                oldUser.setLastname(user.getLastname());
                oldUser.setMail(user.getMail());
                oldUser.setUserRole(user.getUserRole());
                return userRepository.save(oldUser);
            } else {
                throw new Exception("User not found with id: "+id);
            }
        } catch (Exception  e) {
            e.printStackTrace();
            System.err.println("Error updating User: "+id);
            return null;
        }
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public String deleteUser(@PathVariable("id") String id) {
        try {
            userRepository.delete(id);
            return "User with id: " + id + " succussfully deleted";
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return "Error deleting User: "+id;
        }
    }

    @RequestMapping(value = "/{id}/sensor",method = RequestMethod.PUT, consumes = "application/json")
    public User updateUserSensorList(@PathVariable("id") String id, @RequestBody ArrayList<String> sensorList) {
        try {
            User user = userRepository.findOne(id);

            if (user != null) {
                user.setSensorList(sensorList);
            }
            return userRepository.save(user);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            System.err.println("Error attaching Sensor to User: "+id);
            return null;
        }
    }

    @RequestMapping(value = "/{id}/sensor", method = RequestMethod.GET)
    public Iterable<Sensor> getAllAttachedSensors(@PathVariable("id") String id) {
        try {
            User user = userRepository.findOne(id);
            if (user != null) {
                ArrayList<Sensor> sensorList = new ArrayList<Sensor>();
                if (user.getSensorList() != null) {
                    for (String sensorID : user.getSensorList()) {
                        sensorList.add(sensorRepository.findOne(sensorID));
                    }
                }
                return sensorList;
            } else {
                throw new EntityNotFoundException();
            }
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            System.err.println("Error requesting sensorList for User: "+id);
        }
        return null;
    }

    // Table Create/Delete


    @RequestMapping(value = "/createTable")
    public String createTable() throws Exception {
        return userTableCreator.createUserTable();
    }

    @RequestMapping(value = "/deleteTable")
    public String deleteTable() throws Exception {
        return userTableCreator.deleteTable(TableCreator.TABLENAME_USER);
    }

}
