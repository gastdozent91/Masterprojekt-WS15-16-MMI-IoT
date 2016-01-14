package de.bht.mmi.iot.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class InitializeDynamoDbTables implements ApplicationListener<ContextRefreshedEvent> {

    private final Logger logger = LoggerFactory.getLogger(InitializeDynamoDbTables.class);

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        logger.info(event.getClass().getName() + " received!");
    }

}
