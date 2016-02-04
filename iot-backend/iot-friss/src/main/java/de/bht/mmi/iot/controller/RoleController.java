package de.bht.mmi.iot.controller;

import de.bht.mmi.iot.constants.RoleConstants;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
public class RoleController {

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<String> getAllRoles() {
        return RoleConstants.getAllRoles();
    }

}
