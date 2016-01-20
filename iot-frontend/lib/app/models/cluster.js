var request = require('superagent')
  , Promise = require('bluebird');

var dynamodb = require('../plugins/dynamodb');

module.exports = me = {};

var endpoint = 'http://localhost:8080/iot-friss';

me.getAll = (user) => {
  return new Promise((resolve, reject) => {
    request
      .get(endpoint + '/cluster')
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.getOne = (user, clustername) => {
  return new Promise((resolve, reject) => {
    request
      .get(endpoint + '/cluster/' + clustername)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.update = (user, clusterToUpdate) => {
  return new Promise((resolve, reject) => {
    request
      .put(endpoint + '/cluster/' + clusterToUpdate.username)
      .send(clusterToUpdate)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.delete = (user, clusterToDelete) => {
  return new Promise((resolve, reject) => {
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
  return new Promise((resolve, reject) => {
    request
      .post(endpoint + '/cluster')
      .send(clusterToCreate)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

