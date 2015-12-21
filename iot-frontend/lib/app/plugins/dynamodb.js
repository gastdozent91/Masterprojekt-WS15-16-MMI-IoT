var AWS = require('aws-sdk');

module.exports = me = {};

AWS.config.update({
  region: 'us-west-2',
  endpoint: 'http://192.168.99.100:8000'
});

var dynamodb = new AWS.DynamoDB();
var dynamodbDoc = new AWS.DynamoDB.DocumentClient();

me.db = dynamodb;

me.doc = dynamodbDoc;
