package de.bht.mmi.iot.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import org.apache.commons.lang3.StringUtils;
import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import javax.annotation.PostConstruct;

@Configuration
@PropertySource("classpath:db.properties")
@EnableDynamoDBRepositories(basePackages = "de.bht.mmi.iot.repository")
public class DynamoDBConfig {

    @Autowired
    private Environment env;

    private String amazonDynamoDBEndpoint;

    private String amazonAWSAccessKey;

    private String amazonAWSSecretKey;

    @Bean
    public AmazonDynamoDB amazonDynamoDB() {
        final AmazonDynamoDB amazonDynamoDB = new AmazonDynamoDBClient(amazonAWSCredentials());
        if (StringUtils.isNotEmpty(amazonDynamoDBEndpoint)) {
            amazonDynamoDB.setEndpoint(amazonDynamoDBEndpoint);
        }
        return amazonDynamoDB;
    }

    @Bean
    public AWSCredentials amazonAWSCredentials() {
        return new BasicAWSCredentials(amazonAWSAccessKey, amazonAWSSecretKey);
    }

    @PostConstruct
    private void init() {
        amazonDynamoDBEndpoint = env.getProperty("amazon.dynamodb.endpoint");
        amazonAWSAccessKey = env.getProperty("amazon.aws.accesskey");
        amazonAWSSecretKey = env.getProperty("amazon.aws.secretkey");
    }

}
