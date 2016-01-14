package de.bht.mmi.iot.main;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.bht.mmi.iot.config.AmqpConfiguration;
import de.bht.mmi.iot.config.AppConfig;
import de.bht.mmi.iot.model.AmqpConstants;
import de.bht.mmi.iot.model.BulkMessage;
import de.bht.mmi.iot.model.SensorType;
import de.bht.mmi.iot.service.BulkMessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageBuilder;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.io.IOException;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeoutException;

public final class Main {

    private static final Timer timer = new Timer();

    private static final Random random = new Random();

    public static void main(String... argv) throws IOException, TimeoutException, InterruptedException {

        // min number of values in one bulk message - see build.gradle
        final int minNumValuesInBulk = Integer.parseInt(System.getProperty("minNumValues", "70"));

        // max number of values in one bulk message - see build.gradle
        final int maxNumValuesInBulk = Integer.parseInt(System.getProperty("maxNumValues", "140"));

        // time in milliseconds between send message - see build.gradle
        final int schedulePeriod = Integer.parseInt(System.getProperty("schedulePeriod", "100"));

        final Logger LOGGER = LoggerFactory.getLogger(Main.class);

        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
        ctx.register(AppConfig.class);
        ctx.register(AmqpConfiguration.class);
        ctx.refresh();

        final ObjectMapper objectMapper = ctx.getBean(ObjectMapper.class);
        final RabbitTemplate rabbitTemplate = ctx.getBean(RabbitTemplate.class);
        final BulkMessageService bulkMessageService = ctx.getBean(BulkMessageService.class);

        final TimerTask task = new TimerTask() {

            @Override
            public void run() {

                Arrays.stream(SensorType.values()).forEach(sensorType -> {
                    try {
                        BulkMessage<?> bulkMessage = bulkMessageService.getDummyBulkMessage(sensorType,
                                minNumValuesInBulk, maxNumValuesInBulk);
                        final String bulkMessageAsJsonString = objectMapper.writeValueAsString(bulkMessage);
                        final Message message = MessageBuilder.withBody(bulkMessageAsJsonString.getBytes())
                                .setContentType(org.springframework.amqp.core.MessageProperties.CONTENT_TYPE_TEXT_PLAIN)
                                .setHeader("sensor_type", sensorType.getLabel())
                                .build();

                        rabbitTemplate.send(AmqpConstants.FRISS_EXCHANGE_NAME, "", message);

                        LOGGER.info("Send %s-bulk with %d values at %s%n",
                                sensorType.getLabel(),
                                bulkMessage.getValues().size(),
                                LocalTime.now());
                    } catch (IOException e) {
                        e.printStackTrace();
                        System.exit(1);
                    }
                });
                LOGGER.info("------------------------------------------------------------------------------------------");
            }
        };
        timer.schedule(task, 0, schedulePeriod);
    }
}
