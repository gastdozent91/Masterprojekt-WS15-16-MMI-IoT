package de.bht.mmi.iot.listener;

import de.bht.mmi.iot.constants.AmqpConstants;
import de.bht.mmi.iot.model.Bar;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.*;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RabbitListener(bindings = @QueueBinding(
        value = @Queue(value = AmqpConstants.EXAMPLE_QUEUE_NAME, durable = "false"),
        exchange = @Exchange(value = AmqpConstants.EXAMPLE_EXCHANGE_NAME, type = ExchangeTypes.DIRECT),
        key = AmqpConstants.EXAMPLE_ROUTING_KEY))
public class BarRoutingListener {

    private static final Logger log = LoggerFactory.getLogger(BarRoutingListener.class);

    @RabbitHandler
    public void processBarMessage(@Headers Map<String, String> amqpHeaders, Bar bar) {
        log.info("Received message with payload: {} and amqpHeaders: {}.", bar, amqpHeaders);
    }

}
