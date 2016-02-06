var request = require('superagent')
  , config = require('../plugins/config')
  , Bluebird = require('bluebird');

var dynamodb = require('../plugins/dynamodb');

module.exports = me = {};

var endpoint = config.rest_endpoint;

me.getAll = (user) => {
  return new Bluebird((resolve, reject) => {
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
  return new Bluebird((resolve, reject) => {
    request
      .get(endpoint + '/sensor/' + sensorname)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.update = (user, id, sensorToUpdate) => {
  return new Bluebird((resolve, reject) => {
    request
      .put(endpoint + '/sensor/' + id)
      .send(sensorToUpdate)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.statusCode);
      });
  });
};

me.delete = (user, sensorToDelete) => {
  return new Bluebird((resolve, reject) => {
    request
      .delete(endpoint + '/sensor/' + sensorToDelete)
      .auth(user.username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.statusCode);
      });
  });
};

me.create = (user, sensorToCreate) => {
  return new Bluebird((resolve, reject) => {
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

