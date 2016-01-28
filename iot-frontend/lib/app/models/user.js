var request = require('superagent')
  , config = require('../plugins/config')
  , Bluebird = require('bluebird');

var dynamodb = require('../plugins/dynamodb');

module.exports = me = {};

var endpoint = config.rest_endpoint;

me.getAll = (user) => {
  return new Bluebird((resolve, reject) => {
    request
      .get(endpoint + '/user')
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.getOne = (user, username) => {
  return new Bluebird((resolve, reject) => {
    request
      .get(endpoint + '/user/' + username)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.update = (user, userToUpdate) => {
  return new Bluebird((resolve, reject) => {
    request
      .put(endpoint + '/user/' + userToUpdate.username)
      .send(userToUpdate)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.delete = (user, userToDelete) => {
  return new Bluebird((resolve, reject) => {
    request
      .delete(endpoint + '/user/' + userToDelete)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.create = (user, userToCreate) => {
  return new Bluebird((resolve, reject) => {
    request
      .post(endpoint + '/user')
      .send(userToCreate)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.getSensors = (user, userWithSensors) => {
  return new Bluebird((resolve, reject) => {
    request
      .get(endpoint + '/user/' + userWithSensors + '/sensor')
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.setSensors = (user, userWithSensors, sensors) => {
  return new Bluebird((resolve, reject) => {
    request
      .put(endpoint + '/user/' + userWithSensors + '/sensor')
      .send(sensors)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
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
      "#n": 'Username'
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
