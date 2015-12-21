var dynamodb = require('../plugins/dynamodb');

module.exports = me = {};

var db = dynamodb.db;
var doc = dynamodb.doc;

me.find = function(name, cb) {
  var params = {
    TableName: 'Users',
    KeyConditionExpression: '#n = :n',
    ExpressionAttributeNames:{
      "#n": 'name'
    },
    ExpressionAttributeValues: {
      ":n": name
    }
  };
  doc.query(params, function(err, data) {
    if (err) {
      cb(err);
    } else {
      cb(null, data.Items[0]);
    }
  });
};
