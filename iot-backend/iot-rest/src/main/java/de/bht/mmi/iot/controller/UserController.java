package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.creator.UserTableCreator;
import de.bht.mmi.iot.creator.UserTableCreatorImpl;
import de.bht.mmi.iot.model.User;
import de.bht.mmi.iot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTableCreator userTableCreator;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<User> getAllUser() {
        return userRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @RequestMapping(value = "/{id}",method = RequestMethod.DELETE)
    public String deleteUser(@PathVariable("id") String id) {
        try {
            User user = userRepository.findOne(id);
            userRepository.delete(id);
            return "User with id: " + id + " succussfully deleted";
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return "Error deleting User";
        }
    }

    /*
    @RequestMapping(value = "/createTable")
    public String createTable() throws Exception {
        return userTableCreator.createUserTable();
    }

    @RequestMapping(value = "/deleteTable")
    public String deleteTable() throws Exception {
        return userTableCreator.deleteUserTable();
    }
    */

}
