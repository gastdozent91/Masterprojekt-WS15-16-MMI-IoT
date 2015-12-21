var User = require('../models/user');

module.exports = me = {};

//AWS.config.update({
  //region: 'us-west-2',
  //endpoint: 'http://192.168.99.100:8000'
//});

//var dynamodb = new AWS.DynamoDB();

//me.createTable = function(req, res) {
  //var params = {
    //TableName : "Users",
    //KeySchema: [       
      //{ AttributeName: "name", KeyType: "HASH"},  //Partition key
      ////{ AttributeName: "name", KeyType: "RANGE" }  //Sort key
    //],
    //AttributeDefinitions: [       
      //{ AttributeName: "name", AttributeType: "S" },
      ////{ AttributeName: "password", AttributeType: "S" }
    //],
    //ProvisionedThroughput: {       
      //ReadCapacityUnits: 10, 
      //WriteCapacityUnits: 10
    //}
  //};

  //dynamodb.createTable(params, function(err, data) {
    //if (err) {
      //console.log('Unable to create table. Error JSON: '
                  //, JSON.stringify(err, null, 2))
      //res.json(err);
    //} else {
      //console.log('Created table. Table description JSON: '
                  //, JSON.stringify(data, null, 2));
      //res.json(data);
    //}
  //});
//};

me.getUser = function(req, res) {
  User.find('Guest', function(err, data) {
    if (err) res.json(err);

    res.json(data);
  });
};
