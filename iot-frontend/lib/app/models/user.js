var dynamodb = require('../plugins/dynamodb');
var request = require('superagent');

module.exports = me = {};

me.getAll = (user, cb) => {
  var authBuffer= new Buffer('admin:admin');
  //var authBuffer= new Buffer(user.username + ':' + user.password);
  var auth = authBuffer.toString('base64');
  request
    .get('http://localhost:8080/iot-rest/user')
    .set('Authorization', 'Basic ' + auth)
    .end((err, res) => {
      if (err) cb(err);
      cb(null, res);
    });
};

me.update = (user, userToUpdate, cb) => {
  var authBuffer= new Buffer(user.username + ':' + user.password);
  var auth = authBuffer.toString('base64');
  request
    .put('http://localhost:8080/iot-rest/user/' + userToUpdate.username)
    .send(user)
    .set('Authorization', 'Basic ' + auth)
    .end((err, res) => {
      if (err) cb(err);
      cb(null, res);
    });
};

me.delete = (user, userToDelete, cb) => {
  var authBuffer= new Buffer('admin:admin');
  //var authBuffer= new Buffer(user.username + ':' + user.password);
  var auth = authBuffer.toString('base64');
  request
    .delete('http://localhost:8080/iot-rest/user/' + userToDelete)
    .set('Authorization', 'Basic ' + auth)
    .end((err, res) => {
      if (err) cb(err);
      cb(null, res);
    });
};

me.create = (user, userToCreate, cb) => {
  var authBuffer= new Buffer('admin:admin');
  //var authBuffer= new Buffer(user.username + ':' + user.password);
  var auth = authBuffer.toString('base64');
  request
    .post('http://localhost:8080/iot-rest/user')
    .send(userToCreate)
    .set('Authorization', 'Basic ' + auth)
    .end((err, res) => {
      if (err) cb(err);
      cb(null, res);
    });
};

me.getSensors = (user, userWithSensors, cb) => {
  //var authBuffer= new Buffer('admin:admin');
  var authBuffer= new Buffer(user.username + ':' + user.password);
  var auth = authBuffer.toString('base64');
  request
    .get('http://localhost:8080/iot-rest/user/' + userWithSensors + '/sensor')
    .set('Authorization', 'Basic ' + auth)
    .end((err, res) => {
      if (err) cb(err);
      cb(null, res);
    });
};

me.setSensors = (user, userWithSensors, sensors, cb) => {
  //var authBuffer= new Buffer('admin:admin');
  var authBuffer= new Buffer(user.username + ':' + user.password);
  var auth = authBuffer.toString('base64');
  request
    .put('http://localhost:8080/iot-rest/user/' + userWithSensors + '/sensor')
    .send(sensors)
    .set('Authorization', 'Basic ' + auth)
    .end((err, res) => {
      if (err) cb(err);
      cb(null, res);
    });
};


// access dynamo directly for frontend authentification

var db = dynamodb.db;
var doc = dynamodb.doc;

me.find = function(username, cb) {
  var params = {
    TableName: 'User',
    KeyConditionExpression: '#n = :n',
    ExpressionAttributeNames:{
      "#n": 'username'
    },
    ExpressionAttributeValues: {
      ":n": username
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
