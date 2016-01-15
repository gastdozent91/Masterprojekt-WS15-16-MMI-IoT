package de.bht.mmi.iot.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/query")
public class QueryController {

    @RequestMapping(value = "/{param}",method = RequestMethod.GET)
    public Iterable<Object> startQuery(@PathVariable("param") String param) {
        //TODO
        return null;
    }
}
