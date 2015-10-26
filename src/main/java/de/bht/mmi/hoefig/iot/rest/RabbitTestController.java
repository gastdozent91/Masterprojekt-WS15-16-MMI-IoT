package de.bht.mmi.hoefig.iot.rest;

import de.bht.mmi.hoefig.iot.service.AmqpMessageService;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/rabbit")
public class RabbitTestController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RequestMapping(value = "/test/send")
    public String testSendMessage() {
        Message message = MessageBuilder.withBody("foo".getBytes())
                .setContentType(MessageProperties.CONTENT_TYPE_TEXT_PLAIN)
                .setMessageId("123")
                .setHeader("bar", "baz")
                .build();
        rabbitTemplate.send("auto.exch", "orderRoutingKey", message);
        return "Send message";
    }

    @RequestMapping(value = "/test/message")
    public List<Message> getMessages() {
        return AmqpMessageService.messages;
    }

    @RequestMapping(value = "/test")
    public String testController() {
        return String.format("%s accessible.", this.getClass().getSimpleName());
    }

}
