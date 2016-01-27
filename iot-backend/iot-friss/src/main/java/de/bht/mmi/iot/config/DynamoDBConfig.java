package de.bht.mmi.iot.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import org.apache.commons.lang3.StringUtils;
import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
@EnableDynamoDBRepositories(basePackages = "de.bht.mmi.iot.repository")
public class DynamoDBConfig {

    private String s;

    @Value("${amazon.dynamodb.endpoint}")
    private String amazonDynamoDBEndpoint;

    @Value("${amazon.aws.accesskey}")
    private String amazonAWSAccessKey;

    @Value("${amazon.aws.secretkey}")
    private String amazonAWSSecretKey;

    @Value("${amazon.dynamodb.read_capacity_units}")
    private Long readCapacityUnitsPerSecond;

    @Value("${amazon.dynamodb.write_capacity_units}")
    private Long writeCapacityUnitsPerSecond;

    private ProvisionedThroughput provisionedThroughput;

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

    @Bean
    public DynamoDBMapper dynamoDbMapper() {
        return new DynamoDBMapper(amazonDynamoDB());
    }

    @PostConstruct
    private void init() {
        provisionedThroughput = new ProvisionedThroughput(readCapacityUnitsPerSecond, writeCapacityUnitsPerSecond);
    }

    public Long getReadCapacityUnitsPerSecond() {
        return readCapacityUnitsPerSecond;
    }

    public Long getWriteCapacityUnitsPerSecond() {
        return writeCapacityUnitsPerSecond;
    }

    public ProvisionedThroughput getProvisionedThroughput() {
        return provisionedThroughput;
    }

}