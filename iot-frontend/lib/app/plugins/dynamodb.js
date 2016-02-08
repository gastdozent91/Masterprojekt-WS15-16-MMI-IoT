var AWS = require('aws-sdk')
  , config = require('./config');

module.exports = me = {};

try {
  AWS.config.loadFromPath('./config/aws_config.json');
} catch(e) {
  AWS.config.loadFromPath('./config/example_aws_config.json');
}

AWS.config.update({
  region: 'us-west-2',
  endpoint: config.dynamo_endpoint
});

var dynamodb = new AWS.DynamoDB();
var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

me.db = dynamodb;

me.doc = dynamodbDoc;
