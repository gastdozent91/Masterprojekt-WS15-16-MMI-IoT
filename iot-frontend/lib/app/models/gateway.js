var request = require('superagent')
  , config = require('../plugins/config')
  , Bluebird = require('bluebird');

var dynamodb = require('../plugins/dynamodb');

module.exports = me = {};

var endpoint = config.rest_endpoint;

me.getAll = (user) => {
  return new Bluebird((resolve, reject) => {
    request
      .get(endpoint + '/gateway')
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.getOne = (user, id) => {
  return new Bluebird((resolve, reject) => {
    request
      .get(endpoint + '/gateway/' + id)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.getSensors = (user, id) => {
  return new Bluebird((resolve, reject) => {
    request
      .get(endpoint + '/gateway/' + id + '/sensor')
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.update = (user, id, gatewayToUpdate) => {
  return new Bluebird((resolve, reject) => {
    request
      .put(endpoint + '/gateway/' + id)
      .send(gatewayToUpdate)
      .auth(user.username, user.password)
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
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.statusCode);
      });
  });
};

me.create = (user, gatewayToCreate) => {
  return new Bluebird((resolve, reject) => {
    request
      .post(endpoint + '/gateway')
      .send(gatewayToCreate)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

