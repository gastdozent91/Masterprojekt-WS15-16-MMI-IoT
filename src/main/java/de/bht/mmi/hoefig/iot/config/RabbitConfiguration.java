package de.bht.mmi.hoefig.iot.config;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@EnableRabbit
@PropertySource("classpath:rabbit.properties")
public class RabbitConfiguration {

    @Autowired
    private Environment env;

    @Bean
    public ConnectionFactory connectionFactory() {
        final CachingConnectionFactory connectionFactory = new CachingConnectionFactory(
                env.getProperty("rabbit.host"),
                Integer.valueOf(env.getProperty("rabbit.port")));
        connectionFactory.setUsername(env.getProperty("rabbit.username"));
        connectionFactory.setPassword(env.getProperty("rabbit.password"));
        connectionFactory.setChannelCacheSize(Integer.valueOf(env.getProperty("rabbit.channel_cache_size")));
        return connectionFactory;
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory() {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory());
        factory.setConcurrentConsumers(Integer.valueOf(env.getProperty("rabbit.concurrent_consumers")));
        factory.setMaxConcurrentConsumers(Integer.valueOf(env.getProperty("rabbit.max_concurrent_consumers")));
        return factory;
    }

}
