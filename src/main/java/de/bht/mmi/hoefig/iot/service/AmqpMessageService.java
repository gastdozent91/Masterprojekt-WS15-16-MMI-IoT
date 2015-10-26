package de.bht.mmi.hoefig.iot.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Component
public class AmqpMessageService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AmqpMessageService.class);

    // TODO: Remove this (only for demo)
    public static final List<Message> messages = new LinkedList<>();

    // TODO: Replace hard coded queue name with property value
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "iot", durable = "true"),
            exchange = @Exchange(value = "auto.exch"),
            key = "orderRoutingKey")
    )
    public void processMessage(Message message) {
        messages.add(message);;
    }

}
