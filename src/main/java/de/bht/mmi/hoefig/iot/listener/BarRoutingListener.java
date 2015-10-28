package de.bht.mmi.hoefig.iot.listener;

import de.bht.mmi.hoefig.iot.model.AmqpConstants;
import de.bht.mmi.hoefig.iot.model.Bar;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class BarRoutingListener {

    @RabbitHandler
    public void processBarMessage(@Headers Map<String, String> amqpHeaders, Bar bar) {
        log.info("Received message with payload: {} and amqpHeaders: {}.", bar, amqpHeaders);
    }

}
