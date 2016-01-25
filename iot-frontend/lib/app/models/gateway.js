var request = require('superagent')
  , Bluebird = require('bluebird');

var dynamodb = require('../plugins/dynamodb');

module.exports = me = {};

var endpoint = 'http://localhost:8080/iot-friss';

me.getAll = (user) => {
  return new Bluebird((resolve, reject) => {
    request
      .get(endpoint + '/gateway')
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.getOne = (user, gatewayname) => {
  return new Bluebird((resolve, reject) => {
    request
      .get(endpoint + '/gateway/' + gatewayname)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.update = (user, gatewayToUpdate) => {
  return new Bluebird((resolve, reject) => {
    request
      .put(endpoint + '/gateway/' + gatewayToUpdate.username)
      .send(gatewayToUpdate)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.delete = (user, gatewayToDelete) => {
  return new Bluebird((resolve, reject) => {
    request
      .delete(endpoint + '/gateway/' + gatewayToDelete)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.create = (user, gatewayToCreate) => {
  return new Bluebird((resolve, reject) => {
    request
      .post(endpoint + '/gateway')
      .send(gatewayToCreate)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

