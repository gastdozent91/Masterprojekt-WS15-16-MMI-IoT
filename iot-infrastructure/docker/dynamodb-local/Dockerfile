FROM java:8-jre
MAINTAINER Steven Maasch <maasch@stevenmaasch.de>

# Create working space
RUN mkdir /var/dynamodb_wd
WORKDIR /var/dynamodb_wd

# Default port for DynamoDB Local
EXPOSE 8000

# Get the package from Amazon
RUN wget -O /var/dynamodb_wd/dynamodb_local_latest http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest
RUN tar xfz /var/dynamodb_wd/dynamodb_local_latest

# Default command for image
ENTRYPOINT ["/usr/bin/java", "-Djava.library.path=.", "-jar", "DynamoDBLocal.jar", "-dbPath", "/var/dynamodb_local", "-sharedDb"]
CMD ["-port", "8000"]

# Add VOLUMEs to allow backup of config, logs and databases
VOLUME ["/var/dynamodb_local", "/var/dynamodb_wd"]
