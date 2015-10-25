package de.bht.mmi.hoefig.iot.service;

import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class AmqpMessageService {

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "iot", durable = "true"),
            exchange = @Exchange(value = "auto.exch"),
            key = "iotRoutingKey")
    )
    public void processMessage(String data) {
        System.out.print("");
    }

}
