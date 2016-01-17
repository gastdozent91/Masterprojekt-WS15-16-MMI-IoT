package de.bht.mmi.iot.listener;

import de.bht.mmi.iot.constants.AmqpConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class JsonTopicListener {

    private static final Logger log = LoggerFactory.getLogger(JsonTopicListener.class);

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(),
            exchange = @Exchange(value = AmqpConstants.DATA_TOPIC_EXCHANGE_NAME, type = ExchangeTypes.TOPIC),
            key = AmqpConstants.ALL_MESSAGE_ROUTING_KEY))
    public void processAllMessages(@Headers Map<String, String> amqpHeaders, String data) {
        log.info("Received message with payload: {} and amqpHeaders: {}.", data, amqpHeaders);
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(),
            exchange = @Exchange(value = AmqpConstants.DATA_TOPIC_EXCHANGE_NAME2, type = ExchangeTypes.TOPIC),
            key = AmqpConstants.DATA_GEO_TOPIC_ROUTING_KEY))
         public void processGeoDataMessages(@Headers Map<String, String> amqpHeaders, String data) {
        log.info("{}", data);
    }

}
