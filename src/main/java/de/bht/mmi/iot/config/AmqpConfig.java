package de.bht.mmi.iot.config;

import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.ContentTypeDelegatingMessageConverter;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

@Configuration
@EnableRabbit
@PropertySource("classpath:rabbit.properties")
public class AmqpConfig {

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
    public RabbitAdmin rabbitAdmin() {
        return new RabbitAdmin(connectionFactory());
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory() {
        final SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory());
        factory.setConcurrentConsumers(Integer.valueOf(env.getProperty("rabbit.concurrent_consumers")));
        factory.setMaxConcurrentConsumers(Integer.valueOf(env.getProperty("rabbit.max_concurrent_consumers")));
        factory.setMessageConverter(contentTypeConverter());
        return factory;
    }

    @Bean
    public RabbitTemplate rabbitTemplate() {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }

    @Bean
    public ContentTypeDelegatingMessageConverter contentTypeConverter() {
        final ContentTypeDelegatingMessageConverter contentTypeDelegatingMessageConverter =
                new ContentTypeDelegatingMessageConverter();
        contentTypeDelegatingMessageConverter.addDelgate(
                MessageProperties.CONTENT_TYPE_JSON, jsonMessageConverter());
        return contentTypeDelegatingMessageConverter;
    }

    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

}
