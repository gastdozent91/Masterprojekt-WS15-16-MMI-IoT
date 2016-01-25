package de.bht.mmi.iot.listener.amqp;

import de.bht.mmi.iot.constants.AmqpConstants;
import de.bht.mmi.iot.model.Measurement;
import de.bht.mmi.iot.service.MeasurementService;
import org.joda.time.DateTime;
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

import java.util.Arrays;
import java.util.Map;

@Component
public class FrissListener {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private MeasurementService measurementService;

    private static final Logger LOGGER = LoggerFactory.getLogger(FrissListener.class);

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(),
            exchange = @Exchange(value = AmqpConstants.FRISS_EXCHANGE_NAME, type = ExchangeTypes.TOPIC),
            key = AmqpConstants.ALL_MESSAGE_ROUTING_KEY)
    )
    public void processFriss(@Headers Map<String, String> amqpHeaders, String data) {
        LOGGER.info("Received message with payload: {} and amqpHeaders: {}.", data, amqpHeaders);
        Measurement m = new Measurement();
        m.setSensorId("abc");
        m.setTimeOfMeasurement(DateTime.now());
        m.setAcceleration(Arrays.asList(1, 0.4, 0.4));
        measurementService.save(Arrays.asList(m));

    }

}
