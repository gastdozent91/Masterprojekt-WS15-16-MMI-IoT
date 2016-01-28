var AWS = require('aws-sdk')
  , config = require('./config');

module.exports = me = {};

AWS.config.update({
  region: 'us-west-2',
  endpoint: config.dynamo_endpoint
});

var dynamodb = new AWS.DynamoDB();
var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

me.db = dynamodb;

me.doc = dynamodbDoc;
