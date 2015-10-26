package de.bht.mmi.hoefig.iot.listener;

import de.bht.mmi.hoefig.iot.model.AmqpConstants;
import de.bht.mmi.hoefig.iot.model.Bar;
import org.springframework.amqp.rabbit.annotation.*;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RabbitListener(bindings = @QueueBinding(
        value = @Queue(value = AmqpConstants.EXAMPLE_QUEUE_NAME, durable = "true"),
        exchange = @Exchange(value = AmqpConstants.EXAMPLE_EXCHANGE_NAME), key = AmqpConstants.EXAMPLE_ROUTING_KEY_TEMPERATURE))
public class ExampleMessageListener {

    @RabbitHandler
    public void processBarMessage(@Headers Map<String, String> amqpHeaders, Bar bar) {
        System.out.println(String.format("[x] Received message with payload: %s and amqpHeaders: %s.", bar, amqpHeaders));
    }

}
