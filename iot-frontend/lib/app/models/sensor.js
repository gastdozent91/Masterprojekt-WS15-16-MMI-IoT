var request = require('superagent')
  , Bluebird = require('bluebird');

var dynamodb = require('../plugins/dynamodb');

module.exports = me = {};

var endpoint = 'http://localhost:8080/iot-friss';

me.getAll = (user) => {
  return new Bluebird((resolve, reject) => {
    request
      .get(endpoint + '/sensor')
      .auth(user.Username, user.password)
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
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
};

me.update = (user, sensorToUpdate) => {
  return new Bluebird((resolve, reject) => {
    request
      .put(endpoint + '/sensor/' + sensorToUpdate.Username)
      .send(sensorToUpdate)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.delete = (user, sensorToDelete) => {
  return new Bluebird((resolve, reject) => {
    request
      .delete(endpoint + '/sensor/' + sensorToDelete)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

me.create = (user, sensorToCreate) => {
  return new Bluebird((resolve, reject) => {
    request
      .post(endpoint + '/sensor')
      .send(sensorToCreate)
      .auth(user.Username, user.password)
      .end((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
  });
};

