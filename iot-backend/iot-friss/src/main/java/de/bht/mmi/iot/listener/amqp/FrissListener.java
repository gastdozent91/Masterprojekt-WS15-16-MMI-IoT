package de.bht.mmi.iot.listener.amqp;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.bht.mmi.iot.constants.AmqpConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class FrissListener {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private AmazonDynamoDB amazonDynamoDB;

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    @Autowired
    private ObjectMapper objectMapper;

    private static final Logger log = LoggerFactory.getLogger(FrissListener.class);

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(),
            exchange = @Exchange(value = AmqpConstants.FRISS_EXCHANGE_NAME, type = ExchangeTypes.TOPIC),
            key = AmqpConstants.ALL_MESSAGE_ROUTING_KEY)
    )
    public void processFriss(@Headers Map<String, String> amqpHeaders, String data) {
        log.info("Received message with payload: {} and amqpHeaders: {}.", data, amqpHeaders);
        //amazonDynamoDB.batchWriteItem(new BatchWriteItemRequest());

/*        Measurement m = new Measurement();
        m.setSensorId("abc");
        m.setTimeOfMeasurement(DateTime.now());
        final List<?> l = dynamoDBMapper.batchSave(Arrays.asList(m));
        List<?> a = l;*/


    }

}