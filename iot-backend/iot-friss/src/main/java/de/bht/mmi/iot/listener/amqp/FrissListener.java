package de.bht.mmi.iot.listener.amqp;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.bht.mmi.iot.constants.AmqpConstants;
import de.bht.mmi.iot.exception.EntityNotFoundException;
import de.bht.mmi.iot.model.Bulk;
import de.bht.mmi.iot.model.Measurement;
import de.bht.mmi.iot.service.SensorService;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FrissListener {

    private static final Logger LOGGER = LoggerFactory.getLogger(FrissListener.class);

    private static final TypeReference<List<Measurement>> listOfMeasurementTypeRef =
            new TypeReference<List<Measurement>>() {};

    @Autowired
    @Qualifier("measurementObjectMapper")
    private ObjectMapper objectMapper;

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    @Autowired
    private SensorService sensorService;

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(),
            exchange = @Exchange(value = AmqpConstants.FRISS_EXCHANGE_NAME, type = ExchangeTypes.TOPIC),
            key = AmqpConstants.ALL_MESSAGE_ROUTING_KEY)
    )
    public void processBulk(@Header("id") String messageId, @Header("amqp_receivedRoutingKey") String routingKey,
                            @Header("timestamp") Long timestamp, String data) {
        try {
            LOGGER.info("Received bulk message with routingKey: '{}' and timestamp: '{}", routingKey, timestamp);

            // Check if sensor is active - routingKey == sensorId
            if (!sensorService.isActive(routingKey)) {
                LOGGER.warn("Sensor with id: '{}' not active", routingKey);
                return;
            }

            // Create bulk from data and save
            final List<Measurement> measurements = objectMapper.readValue(data, listOfMeasurementTypeRef);
            final Bulk bulk = new Bulk();
            bulk.setSensorId(routingKey);
            bulk.setBulkReceived(new DateTime(timestamp));
            bulk.setMeasurements(measurements);
            dynamoDBMapper.save(bulk);
        } catch (EntityNotFoundException e) {
            LOGGER.warn("Sensor with id: '{}' not found");
        } catch (Exception e) {
            LOGGER.error(String.format("Unable to process bulk message with id: '%s'", messageId), e);
        }
    }

}
