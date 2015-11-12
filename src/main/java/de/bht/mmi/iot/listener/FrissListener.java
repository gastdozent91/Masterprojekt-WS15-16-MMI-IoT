package de.bht.mmi.iot.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.bht.mmi.iot.model.AmqpConstants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Slf4j
public class FrissListener {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(),
            exchange = @Exchange(value = AmqpConstants.FRISS_EXCHANGE_NAME, type = ExchangeTypes.FANOUT))
    )
    public void processFriss(@Headers Map<String, String> amqpHeaders, String data) {
        log.info("Received message with payload: {} and amqpHeaders: {}.", data, amqpHeaders);

        // TODO: Split and order bulk

        final String senorType = amqpHeaders.get("sensor_type");
        if (senorType == null) {
            log.warn("Unable to determine sensor type, because key 'sensor_type' is not present in amqp-headers: {}", amqpHeaders);
            return;
        }

        // TODO: Build topic

        final String exampleSensorId = "id01";

        final String exampleTopic = "friss.edited." + senorType + "." + exampleSensorId;

        rabbitTemplate.convertAndSend(AmqpConstants.FRISS_EDITED_EXCHANGE_NAME, exampleTopic, data);

    }

}
