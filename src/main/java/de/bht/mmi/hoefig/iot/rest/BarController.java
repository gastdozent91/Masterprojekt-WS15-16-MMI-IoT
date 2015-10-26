package de.bht.mmi.hoefig.iot.rest;

import de.bht.mmi.hoefig.iot.model.AmqpConstants;
import de.bht.mmi.hoefig.iot.model.Bar;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/bar")
public class BarController {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @RequestMapping(value = "/send")
    public String testSendMessage() {
        final Bar bar = new Bar();
        bar.setId(generateAlphaNumericIdWithLength(4));
        rabbitTemplate.convertAndSend(AmqpConstants.EXAMPLE_EXCHANGE_NAME, AmqpConstants.EXAMPLE_ROUTING_KEY_TEMPERATURE, bar);

        /*
        Message message = MessageBuilder.withBody("foo".getBytes())
                .setContentType(MessageProperties.CONTENT_TYPE_TEXT_PLAIN)
                .setMessageId("123")
                .setHeader("bar", "baz")
                .build();
        rabbitTemplate.send("auto.exch", "orderRoutingKey", message);
        return "Send message";
        */

        return String.format("Send message with payload: %s.", bar);
    }

    @RequestMapping(value = "/test")
    public String testController() {
        return String.format("%s accessible.", this.getClass().getSimpleName());
    }

    private static final String generateAlphaNumericIdWithLength(int length) {
        assert length >= 1;
        final String uuid = UUID.randomUUID().toString();
        return uuid.substring(0,length + 1);
    }

}
