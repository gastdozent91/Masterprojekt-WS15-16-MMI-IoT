var request = require('superagent')
  , Promise = require('bluebird');

var dynamodb = require('../plugins/dynamodb');

module.exports = me = {};

var endpoint = 'http://localhost:8080/iot-friss';

me.getAll = (user) => {
  return new Promise((resolve, reject) => {
    request
      .get(endpoint + '/sensor')
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.getOne = (user, sensorname) => {
  return new Promise((resolve, reject) => {
    request
      .get(endpoint + '/sensor/' + sensorname)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.update = (user, sensorToUpdate) => {
  return new Promise((resolve, reject) => {
    request
      .put(endpoint + '/sensor/' + sensorToUpdate.username)
      .send(sensorToUpdate)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.delete = (user, sensorToDelete) => {
  return new Promise((resolve, reject) => {
    request
      .delete(endpoint + '/sensor/' + sensorToDelete)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.create = (user, sensorToCreate) => {
  return new Promise((resolve, reject) => {
    request
      .post(endpoint + '/sensor')
      .send(sensorToCreate)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

