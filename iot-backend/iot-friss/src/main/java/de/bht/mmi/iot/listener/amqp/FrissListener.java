package de.bht.mmi.iot.listener.amqp;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.bht.mmi.iot.constants.AmqpConstants;
import de.bht.mmi.iot.model.Measurement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
public class FrissListener {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    @Qualifier("measurementObjectMapper")
    private ObjectMapper objectMapper;

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    private static final Logger LOGGER = LoggerFactory.getLogger(FrissListener.class);

    private static final TypeReference<List<Measurement>> listOfMeasurementTypeRef = new TypeReference<List<Measurement>>() {};

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(),
            exchange = @Exchange(value = AmqpConstants.FRISS_EXCHANGE_NAME, type = ExchangeTypes.TOPIC),
            key = AmqpConstants.ALL_MESSAGE_ROUTING_KEY)
    )
    public void processFriss(@Headers Map<String, String> amqpHeaders, String data) {
        LOGGER.info("Received message with amqpHeaders: {}", amqpHeaders);
        try {
            final List<Measurement> measurements = objectMapper.readValue(data, listOfMeasurementTypeRef);
            dynamoDBMapper.batchSave(measurements);
            LOGGER.info("Attempt to save {} measurements", measurements.size());
        } catch (Exception e) {
            LOGGER.error("Unable to parse bulk message body", e);
        }
    }

}
