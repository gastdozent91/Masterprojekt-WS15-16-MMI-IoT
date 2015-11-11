package de.bht.mmi.iot.listener;

import de.bht.mmi.iot.model.AmqpConstants;
import de.bht.mmi.iot.model.AmqpTopics;
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
public class SensorTopicListener {

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(),
            exchange = @Exchange(value = AmqpConstants.SENSOR_EXCHANGE_NAME, type = ExchangeTypes.TOPIC),
            key = AmqpTopics.TEMPERATURE_ALL_RAW))
    public void processAllRawTemperatureSensors(@Headers Map<String, String> amqpHeaders, String data) {
        log.info("Received message with payload: {} and amqpHeaders: {}.", data, amqpHeaders);
    }

}
