package de.bht.mmi.iot.config;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@EnableRabbit
@PropertySource("classpath:app.properties")
public class AmqpConfig {

    @Autowired
    private Environment env;

    @Bean
    public ConnectionFactory connectionFactory() {
        final CachingConnectionFactory connectionFactory = new CachingConnectionFactory(
                env.getRequiredProperty("rabbit.host"),
                Integer.valueOf(env.getRequiredProperty("rabbit.port")));
        connectionFactory.setUsername(env.getRequiredProperty("rabbit.username"));
        connectionFactory.setPassword(env.getRequiredProperty("rabbit.password"));
        connectionFactory.setChannelCacheSize(Integer.valueOf(env.getRequiredProperty("rabbit.channel_cache_size")));
        return connectionFactory;
    }

    @Bean
    public RabbitAdmin rabbitAdmin() {
        return new RabbitAdmin(connectionFactory());
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory() {
        final SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory());
        factory.setConcurrentConsumers(Integer.valueOf(env.getRequiredProperty("rabbit.concurrent_consumers")));
        factory.setMaxConcurrentConsumers(Integer.valueOf(env.getRequiredProperty("rabbit.max_concurrent_consumers")));
        return factory;
    }

    @Bean
    public RabbitTemplate rabbitTemplate() {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
        return rabbitTemplate;
    }


}
