package de.bht.mmi.hoefig.iot.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.bht.mmi.hoefig.iot.model.AmqpConstants;
import de.bht.mmi.hoefig.iot.model.Bar;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Timer;
import java.util.TimerTask;

@RestController
@RequestMapping("/send")
public class SendController {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private boolean running = true;

    @RequestMapping(value = "/bar")
    public String sendBar() {
        final Bar bar = Bar.newInstance();

        rabbitTemplate.convertAndSend(AmqpConstants.EXAMPLE_EXCHANGE_NAME, AmqpConstants.EXAMPLE_ROUTING_KEY, bar);

        return String.format("Send message with payload: %s.", bar);
    }

    @RequestMapping(value = "/topic")
    public String sendJsonToTopic() throws JsonProcessingException {
        final Bar bar = Bar.newInstance();
        final String barAsJsonString = objectMapper.writeValueAsString(bar);

        Message message = MessageBuilder.withBody(barAsJsonString.getBytes())
                .setContentType(MessageProperties.CONTENT_TYPE_TEXT_PLAIN)
                .setMessageId("123")
                .setHeader("customHeader", "customHeaderValue")
                .build();
        rabbitTemplate.send(AmqpConstants.DATA_TOPIC_EXCHANGE_NAME, AmqpConstants.ALL_MESSAGE_ROUTING_KEY, message);

        return String.format("Send message with payload: %s.", barAsJsonString);
    }


    @RequestMapping(value = "/test")
    public String testController() {
        return String.format("%s accessible.", this.getClass().getSimpleName());
    }

    @RequestMapping(value = "/publish")
    public String startPublishing(@RequestParam(value = "sec", required = false) Integer seconds) throws JsonProcessingException{

        if (seconds == null) {
            seconds = 10;
        }

        if (running) {
            running = false;
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                @Override
                public void run() {
                    running = true;
                }
            }, seconds * 1000);

            while (!running) {
                final Bar bar = Bar.newInstance();
                final String barAsJsonString = objectMapper.writeValueAsString(bar);

                Message message = MessageBuilder.withBody(barAsJsonString.getBytes())
                        .setContentType(MessageProperties.CONTENT_TYPE_TEXT_PLAIN)
                        .setMessageId("123")
                        .setHeader("customHeader", "customHeaderValue")
                        .build();
                rabbitTemplate.send(AmqpConstants.DATA_TOPIC_EXCHANGE_NAME2, AmqpConstants.DATA_GEO_TOPIC_ROUTING_KEY, message);
            }
        }
        return "start publishing";
    }

}
