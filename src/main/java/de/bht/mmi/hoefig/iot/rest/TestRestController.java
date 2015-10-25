package de.bht.mmi.hoefig.iot.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestRestController {

    @RequestMapping(value = "/test")
    public String test() {
        return String.format("%s accessible.", this.getClass().getSimpleName());
    }

}
