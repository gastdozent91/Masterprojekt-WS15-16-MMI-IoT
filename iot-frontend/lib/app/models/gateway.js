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
      .auth(user.Username, user.password)
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
      .auth(user.Username, user.password)
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

