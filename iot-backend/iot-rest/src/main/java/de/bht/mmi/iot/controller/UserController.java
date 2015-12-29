package de.bht.mmi.iot.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @RequestMapping("/one")
    public String restTest() {
        System.out.println("moin");
        return "TEst test";
    }
}
