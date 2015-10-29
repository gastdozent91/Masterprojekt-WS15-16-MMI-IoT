package de.bht.mmi.hoefig.iot.listener;

import de.bht.mmi.hoefig.iot.model.AmqpConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Slf4j
public class JsonTopicListener {

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
