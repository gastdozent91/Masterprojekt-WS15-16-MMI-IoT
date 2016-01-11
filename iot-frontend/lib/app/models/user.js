var dynamodb = require('../plugins/dynamodb');

module.exports = me = {};

var db = dynamodb.db;
var doc = dynamodb.doc;

me.find = function(name, cb) {
  var params = {
    TableName: 'User',
    KeyConditionExpression: '#n = :n',
    ExpressionAttributeNames:{
      "#n": 'userID'
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

me.createDummyUser = function(cb) {
  var params = {
      TableName: "Users",
      Item: {
          "name": "Guest",
          "password": "password"
      }
  };

  doc.put(params, function(err, data) {
      if (err) {
        console.log(JSON.stringify(err, null, 2));
        cb(err);
      } else {
        console.log(JSON.stringify(data, null, 2));
        cb(null, data);
      }
  });
};

me.createTable = function(name, cb) {
  var params = {
    TableName : "Users",
    KeySchema: [
      { AttributeName: "name", KeyType: "HASH"},  //Partition key
      //{ AttributeName: "name", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: "name", AttributeType: "S" },
      //{ AttributeName: "password", AttributeType: "S" }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  };

  db.createTable(params, function(err, data) {
    if (err) {
      console.log('Unable to create table. Error JSON: '
                  , JSON.stringify(err, null, 2))
      cb(err);
    } else {
      console.log('Created table. Table description JSON: '
                  , JSON.stringify(data, null, 2));
      cb(null, data);
    }
  });

};
