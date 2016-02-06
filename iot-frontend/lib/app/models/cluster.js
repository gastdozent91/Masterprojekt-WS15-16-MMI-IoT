var request = require('superagent')
  , config = require('../plugins/config')
  , Sensor = require('./sensor')
  , Bluebird = require('bluebird');

var dynamodb = require('../plugins/dynamodb');

module.exports = me = {};

var endpoint = config.rest_endpoint;

me.getAll = (user) => {
  return new Bluebird((resolve, reject) => {
    request
      .get(endpoint + '/cluster')
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
      .get(endpoint + '/cluster/' + id)
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
      .get(endpoint + '/cluster/' + id + '/sensor')
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.update = (user, id, clusterToUpdate) => {
  return new Bluebird((resolve, reject) => {
    request
      .put(endpoint + '/cluster/' + id)
      .send(clusterToUpdate)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.statusCode);
      });
  });
};

me.delete = (user, clusterToDelete) => {
  return new Bluebird((resolve, reject) => {
    request
      .delete(endpoint + '/cluster/' + clusterToDelete)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.create = (user, clusterToCreate) => {
  return new Bluebird((resolve, reject) => {
    request
      .post(endpoint + '/cluster')
      .send(clusterToCreate)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.statusCode);
      });
  });
};

